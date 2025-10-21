<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


?>





<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" />
    <title>Controle de Estoque</title>
</head>

<body>

    <div class="tab">
        <button class="tablinks" onclick="openTab(event, 'Produtos')">Produtos</button>
        <button class="tablinks" onclick="openTab(event, 'Entrada')">Entrada e saída</button>
        <button class="tablinks" onclick="openTab(event, 'Localizacao')">Localização</button>
        <button class="tablinks" onclick="openTab(event, 'Usuarioss')">Usuários</button>
    </div>

    <div class="card">
        <!-- ABA PRODUTOS -->
        <div id="Produtos" class="tabcontent">
            <div class="buttonProdutos-container">
                <input id="buscarProdutos" placeholder="  search..." class="d-flex ms-auto"
                    style="border-radius: 15px; border:none;  box-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-top: 8px; margin-bottom: 8px;">
            </div>



            <table class="table">
                <tbody id="bodyTableProdutos">
                    <tr>
                        <th>Nome</th>
                        <th>LOTE</th>
                        <th>Localização</th>
                        <th>Código</th>
                        <th>Cód. Tinta</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Observações</th>
                    </tr>



                    <?php
                    $produtos = [];
                    $sql = "SELECT 
            p.id,         
            p.nome,       
            p.lote,
            p.local,
            p.codigo,
            p.codtinta,
            p.quant,
            p.data,
            p.descric,
            p.obs,
            u.id_usuario,
            u.usuario     
        FROM nome_produtos p
        LEFT JOIN usuarios_alteracoes up ON p.id = up.id_produto 
        LEFT JOIN usuarios u ON up.id_usuario = u.id_usuario";

                    $result = $conn->query($sql);

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $produtos[] = $row;
                            echo "<tr>";
                            echo "<td>" . htmlspecialchars($row['usuario'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['nome'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['lote'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['local'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['codigo'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['codtinta'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['quant'] ?? '-') . "</td>";
                            echo "<td>" . (!empty($row['data']) ? date('d/m/Y', strtotime($row['data'])) : '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['descric'] ?? '-') . "</td>";
                            echo "<td>" . htmlspecialchars($row['obs'] ?? '-') . "</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='11'>Nenhum produto encontrado.</td></tr>";
                    }
                    ?>





                </tbody>
            </table>
            <div class="d-flex justify-content-start mt-4">
                <div id="paginacaoProdutos" class="ms-3"></div>
            </div>
        </div>

        <!-- ABA ENTRADA -->
        <div id="Entrada" class="tabcontent">
            <div class="button-container">

                <button onclick="mostrarCard()" class="btn-plus">
                    Novo <img width="16" height="16" src="https://img.icons8.com/metro/26/plus-math.png"
                        alt="plus-math" />
                </button>
                <input type="search" id="buscarEntrada" placeholder="  search..." class="d-flex ms-auto"
                    style="border-radius: 15px; border:none;  box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            </div>




            <div id="meuCard" style="display: none;">
                <div class="card-new p-3">
                    <div class="d-flex justify-content-end">
                        <button class="btn-close" onclick="fecharCard()"></button>
                    </div>
                    <h5>Adicionar produto: </h5>

                    <form onsubmit="Salvar(event)">
                        <div class="row mb-2">
                            <div class="col-md-6">
                                <label for="nome" class="form-label">Produto:</label>
                                <input type="text" id="nome" name="nome" placeholder="Nome do produto...">
                            </div>
                            <div class="col-md-6">
                                <label for="lote" class="form-label">Lote:</label>
                                <input type="text" id="lote" name="lote" placeholder="Lote do produto...">
                            </div>

                        </div>
                        <div class="row mb-3 ">
                            <div class="col-md-4 mt-4">
                                <label for="codigo" class="form-label">Código:</label>
                                <input style="width: 190px;" type="text" id="codigo" name="codigo"
                                    placeholder="Código do produto...">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="codtinta" class="form-label">Código Tinta:</label>
                                <input style="width: 190px;" type="text" id="codtinta" name="codtinta"
                                    placeholder="Código da tinta...">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="quant" class="form-label">Quantidade:</label>
                                <input style="width: 150px;" type="number" id="quant" name="quant"
                                    placeholder="Quantidade...">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-4 mt-4">
                                <label for="obs" class="form-label">OBS:</label>
                                <input style="width: 190px;" type="text" id="obs" name="obs"
                                    placeholder="Observações...">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="local" class="form-label">Localização:</label>
                                <select name="local" id="local" class="form-select">
                                    <?php
                                    $result = $conn->query("SELECT * FROM localizacoes ORDER BY setor, fileira, prateleira");

                                    if ($result && $result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            echo "<option value='" . $row['id'] . "'>"
                                                . htmlspecialchars($row['setor']) . " > "
                                                . htmlspecialchars($row['fileira']) . " > "
                                                . htmlspecialchars($row['prateleira']) . "</option>";
                                        }
                                    } else {
                                        echo "<option value=''>Nenhuma localização cadastrada</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="data" class="form-label">Data de Entrada:</label>
                                <input type="date" id="data">
                            </div>

                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12 text-center mt-4">
                                <label for="descric" class="form-label">Descrição:</label>
                                <input style="width: 717px;" type="text" id="descric" name="descric"
                                    placeholder="Descrição do produto...">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="usuario" class="form-label">Usuario:</label>

                                <select name="usuario" id="usuario" class="form-select">
                                    <?php
                                    $result = $conn->query("SELECT usuario FROM usuarios");

                                    if ($result && $result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            echo "<option value='" . htmlspecialchars($row['usuario']) . "'>" . htmlspecialchars($row['usuario']) . "</option>";
                                        }
                                    } else {
                                        echo "<option value=''>Nenhum usuario encontrado</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="turno" class="form-label">Turno:</label>
                                <select name="turno" id="turno" class="form-select">
                                    <option value="1º Turno">1º Turno</option>
                                    <option value="2º turno">2º turno</option>
                                    <option value="3º Turno">3º Turno</option>


                                </select>

                            </div>

                        </div>

                        <div class="row mb-1">
                            <div class="col-md-12 text-end mt-2">
                                <button type="submit" class="btn btn-success mt-2">Salvar</button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>


            <div id="CardEdit" style="display: none;">
                <div class="card-new p-3">
                    <div class="d-flex justify-content-end">
                        <button class="btn-close" onclick="fecharCard()"></button>
                    </div>
                    <h5>Editar produto:</h5>
                    <form onsubmit="SalvarEdicao(event)">
                        <div class="row mb-2">
                            <div class="col-md-6">
                                <label for="nome" class="form-label">Produto:</label>
                                <input type="text" id="nome-edit" name="nome">
                            </div>
                            <div class="col-md-6">
                                <label for="lote" class="form-label">Lote:</label>
                                <input type="text" id="lote-edit" name="lote">
                            </div>

                        </div>
                        <div class="row mb-3 ">
                            <div class="col-md-4 mt-4">
                                <label for="codigo" class="form-label">Código:</label>
                                <input style="width: 190px;" type="text" id="codigo-edit" name="codigo">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="codtinta" class="form-label">Código Tinta:</label>
                                <input style="width: 190px;" type="text" id="codtinta-edit" name="codtinta">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="quant" class="form-label">Quantidade:</label>
                                <input style="width: 150px;" type="number" id="quant-edit" name="quant">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-4 mt-4">
                                <label for="obs" class="form-label">OBS:</label>
                                <input style="width: 190px;" type="text" id="obs-edit" name="obs">
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="local-edit" class="form-label">Localização:</label>
                                <select name="local" id="local-edit" class="form-select">
                                    <?php
                                    $result = $conn->query("SELECT * FROM localizacoes ORDER BY setor, fileira, prateleira");

                                    if ($result && $result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            echo "<option value='" . $row['id'] . "'>"
                                                . htmlspecialchars($row['setor']) . " > "
                                                . htmlspecialchars($row['fileira']) . " > "
                                                . htmlspecialchars($row['prateleira']) . "</option>";
                                        }
                                    } else {
                                        echo "<option value=''>Nenhuma localização cadastrada</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-md-4 mt-4">
                                <label for="data" class="form-label">Data de Entrada:</label>
                                <input type="date" id="data-edit">
                            </div>

                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12 text-center mt-4">
                                <label for="descric" class="form-label">Descrição:</label>
                                <input style="width: 717px;" type="text" id="descric-edit" name="descric">
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-6">
                                <label for="usuario" class="form-label">Usuario:</label>
                                 <select name="usuario" id="usuario-edit" class="form-select">
                                    <?php
                                    $result = $conn->query("SELECT usuario FROM usuarios");

                                    if ($result && $result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            echo "<option value='" . htmlspecialchars($row['usuario']) . "'>" . htmlspecialchars($row['usuario']) . "</option>";
                                        }
                                    } else {
                                        echo "<option value=''>Nenhum usuario encontrado</option>";
                                    }
                                    ?>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="turno" class="form-label">Turno:</label>

                                <select name="turno" id="turno-edit" class="form-select">
                                    <option value="1º Turno">1º Turno</option>
                                    <option value="2º turno">2º turno</option>
                                    <option value="3º Turno">3º Turno</option>


                                </select>


                            </div>

                        </div>

                        <div class="row mb-1">
                            <div class="col-md-12 text-end mt-2">
                                <button type="submit" class="btn btn-success mt-2">Salvar</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <!-- TABELA DE ENTRADAS -->
            <table class="table">
                <tbody id="bodyTable">
                    <tr>
                        <th>Nome</th>
                        <th>LOTE</th>
                        <th>Localização</th>
                        <th>Código</th>
                        <th>Cód. Tinta</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Observações</th>

                    </tr>



                </tbody>
            </table>

            <div class="d-flex justify-content-start mt-4">
                <div id="paginacao" class="ms-3"></div>
            </div>
        </div>





        <!-- ABA LOCALIZAÇÃO -->
        <div id="Localizacao" class="tabcontent">
            <?php
            $localizacoes = [];
            $sql = "SELECT id, setor, fileira, prateleira FROM localizacoes";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $localizacoes[] = $row; // Adiciona todos os campos ao array
                }
            }
            ?>
            <div class="header-localizacao">

                <h3 class="tituloLoc">Localização dos produtos</h3>
            </div>


            <div class="row">



                <div class="col">
                    <table class="table">
                        <tbody id="setorTable">
                            <tr>
                                <th>Id</th>
                                <th>Setor</th>
                            </tr>

                            <?php
                            $localizacoes = [];
                            $sql = "SELECT id, setor FROM localizacoes";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $localizacoes[] = $row;
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($row['id']) . "</td>";
                                    echo "<td>" . htmlspecialchars($row['setor']) . "</td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='1'>Nenhum setor encontrado.</td></tr>";
                            }


                            ?>
                        </tbody>
                    </table>
                    <br>

                    <div class="input-group mb-3">
                        <input type="text" id="setor" name="setor" class="form-control"
                            placeholder="Digite o nome do setor">
                        <button id="addLocalizacao" class="btn-loc">
                            <img width="16" height="16" src="https://img.icons8.com/metro/26/plus-math.png"
                                alt="plus-math" />
                        </button>

                    </div>
                </div>
                <div class="col">
                    <table class="table">
                        <tbody id="fileiraTable">
                            <tr>
                                <th>Fileira</th>
                            </tr>
                            <?php
                            $localizacoes = [];
                            $sql = "SELECT fileira FROM localizacoes";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $localizacoes[] = $row;
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($row['fileira']) . "</td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='1'>Nenhuma fileira encontrada.</td></tr>";
                            }


                            ?>


                        </tbody>
                    </table>
                    <br>

                    <div class="input-group mb-3">
                        <input type="text" id="fileira" name="fileira" class="form-control"
                            placeholder="Digite o nome da fileira">

                    </div>
                </div>

                <div class="col">
                    <table class="table">
                        <tbody id="prateleiraTable">
                            <tr>
                                <th>Prateleira</th>
                            </tr>
                            <?php
                            $localizacoes = [];
                            $sql = "SELECT prateleira FROM localizacoes";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $localizacoes[] = $row;
                                    echo "<tr>";
                                    echo "<td>" . htmlspecialchars($row['prateleira']) . "</td>";
                                    echo "</tr>";
                                }
                            } else {
                                echo "<tr><td colspan='1'>Nenhuma prateleira encontrada.</td></tr>";
                            }


                            ?>


                        </tbody>
                    </table>
                    <br>

                    <div class="input-group mb-3">
                        <input type="text" id="prateleira" name="prateleira" class="form-control"
                            placeholder="Digite o nome da prateleira">


                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-start mt-4">
                <div id="paginacaoLocalizacao" class="ms-3"></div>
            </div>

        </div>


        <div id="Usuarioss" class="tabcontent">
            <div class="button-container">


                <input type="search" id="buscarUsuarioss" placeholder="  search..." class="d-flex ms-auto"
                    style="border-radius: 15px; border:none;  box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            </div>


            <!-- TABELA DE USUARIOS -->
            <table class="table">
                <tbody id="bodyTableUsuarioss">
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Turno</th>
                        <th>Ações</th>

                    </tr>



                    <?php
                    $sql = "SELECT id_usuario, usuario, turno FROM usuarios";
                    $result = $conn->query($sql);

                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($row['id_usuario'] ?? '-') . "</td>";
                        echo "<td>" . htmlspecialchars($row['usuario'] ?? '-') . "</td>";
                        echo "<td>" . htmlspecialchars($row['turno'] ?? '-') . "</td>";
                        ?>
                        <td>
                            <button type="button" method="POST" class="delete-btn" onclick="ExcluirUsuarioss()"><img
                                    width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png"
                                    alt="trash" /></button>

                            <button type="button" method="POST" class="edit-btn" onclick="EditarUsuarioss()"><img width="24"
                                    height="24" src="https://img.icons8.com/material/24/pencil--v1.png"
                                    alt="pencil--v1" /></button>
                        </td>

                        <?php

                        echo "</tr>";
                    }

                    ?>
                    <div id="CardEditUsuarioss" style="display: none;">
                        <div class="cardUser-new p-3">
                            <div class="d-flex justify-content-end">

                                <button class="btn-close" onclick="fecharCardUsuarioss()"></button>
                            </div>
                            <h5>Editar Usuarios:</h5>
                            <form onsubmit="SalvarEdicaoUsuarioss(event)">
                                <div class="row mb-4">
                                    <div class="col-md-8 mt-5">
                                        <label for="usuario" class="form-label">Usuário:</label>
                                         <select name="usuario" id="usuario-edit2" class="form-select">
                                    <?php
                                    $result = $conn->query("SELECT usuario FROM usuarios");

                                    if ($result && $result->num_rows > 0) {
                                        while ($row = $result->fetch_assoc()) {
                                            echo "<option value='" . htmlspecialchars($row['usuario']) . "'>" . htmlspecialchars($row['usuario']) . "</option>";
                                        }
                                    } else {
                                        echo "<option value=''>Nenhum usuario encontrado</option>";
                                    }
                                    ?>
                                </select>
                                    </div>
                                    <div class="col-md-8 mt-2">
                                        <label for="turno" class="form-label">Turno:</label>

                                        <select name="turno" id="turno-edit2" class="form-select">
                                            <option value="1º Turno">1º Turno</option>
                                            <option value="2º turno">2º turno</option>
                                            <option value="3º Turno">3º Turno</option>

                                        </select>
                                    </div>

                                </div>


                                <div class="row mb-1">
                                    <div class="col-md-12 text-end mt-2">
                                        <button type="submit" class="btn btn-success mt-2">Salvar</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>


                </tbody>
            </table>

            <div class="d-flex justify-content-start mt-4">
                <div id="paginacaoUsuarioss" class="ms-3"></div>
            </div>
        </div>


    </div>


    <script>
        <?php
        $usuarios = [];
        $result = $conn->query("SELECT id_usuario, usuario, turno FROM usuarios");
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $usuarios[] = $row;
            }
        }
        ?>
        const usuarios = <?php echo json_encode($usuarios, JSON_UNESCAPED_UNICODE); ?>;
        console.log(usuarios); // 
    </script>
    <script>
        <?php
        $localizacoes = [];
        $sql = "SELECT id, setor, fileira, prateleira FROM localizacoes";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $localizacoes[] = $row; // Adiciona todos os campos ao array
            }
        }
        ?>

    </script>


    <script>
        const produtos = <?php echo json_encode($produtos, JSON_UNESCAPED_UNICODE); ?>;
    </script>

    <script>
        const localizacoes = <?php echo json_encode($localizacoes, JSON_UNESCAPED_UNICODE); ?>;
    </script>

    <script src="index.js" defer></script>


</body>

</html>