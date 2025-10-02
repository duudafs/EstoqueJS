<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Recebe os dados do POST


$nome = $_POST['nome'];
$lote = $_POST['lote'];
$local = $_POST['local'];
$codigo = $_POST['codigo'];       // chave para atualizar o produto
$codtinta = $_POST['codtinta'];
$quant = $_POST['quant'];
$data = $_POST['data'];
$descric = $_POST['descric'];
$obs = $_POST['obs'];

$id_usuario = $_POST['id_usuario'];    // id do usuário
$usuario = $_POST['usuario'];     // novo nome do usuário
$turno = $_POST['turno'];


// Atualiza o produto no banco de dados
$sql = "UPDATE nome_produtos 
        SET nome = ?, lote = ?, local = ?, codtinta = ?, quant = ?, data = ?, descric = ?, obs = ?
        WHERE codigo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssisssi", $nome, $lote, $local, $codtinta, $quant, $data, $descric, $obs, $codigo);



$sql_usuario = "UPDATE usuarios 
    SET usuario = ?, turno = ?
    WHERE id_usuario = ?";
$stmt2 = $conn->prepare($sql_usuario);
$stmt2->bind_param("ssi", $usuario, $turno, $id_usuario);

$success = true;
$errors = [];

if (!$stmt1->execute()) {
    $success = false;
    $errors[] = "Produto: " . $stmt1->error;
}
if (!$stmt2->execute()) {
    $success = false;
    $errors[] = "Usuário: " . $stmt2->error;
}

echo json_encode(["success" => $success, "errors" => $errors]);

$stmt1->close();
$stmt2->close();
$conn->close();
?>