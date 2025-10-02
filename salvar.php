<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) die(json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]));

// Receber dados do formulário
$usuario   = $_POST['usuario'] ?? '';
$turno     = $_POST['turno'] ?? '';
$nome      = $_POST['nome'] ?? '';
$lote      = $_POST['lote'] ?? '';
$local     = $_POST['local'] ?? '';
$codigo    = $_POST['codigo'] ?? '';
$codtinta  = $_POST['codtinta'] ?? '';
$quant     = $_POST['quant'] ?? 0;
$data      = $_POST['data'] ?? '';
$descric   = $_POST['descric'] ?? '';
$obs       = $_POST['obs'] ?? '';

// 1️⃣ Verificar ou criar usuário
$stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE usuario = ? AND turno = ?");
$stmt->bind_param("ss", $usuario, $turno);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $id_usuario = $row['id_usuario'];
    $usuario_status = "existente";
} else {
    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, turno) VALUES (?, ?)");
    $stmt->bind_param("ss", $usuario, $turno);
    if ($stmt->execute()) {
        $id_usuario = $conn->insert_id;
        $usuario_status = "criado";
    } else {
        echo json_encode(["erro" => "Erro ao criar usuário: " . $stmt->error]);
        exit;
    }
}
$stmt->close();

// 2️⃣ Inserir produto
$stmt_prod = $conn->prepare("INSERT INTO nome_produtos (nome, lote, local, codigo, codtinta, quant, data, descric, obs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt_prod->bind_param("sssisisss", $nome, $lote, $local, $codigo, $codtinta, $quant, $data, $descric, $obs);

if ($stmt_prod->execute()) {
    $id_produto = $conn->insert_id;
    $produto_status = "criado";

    // 3️⃣ Inserir relação na tabela usuarios_alteracoes
    $stmt_rel = $conn->prepare("INSERT INTO usuarios_alteracoes (id_usuario, id_produto) VALUES (?, ?)");
    $stmt_rel->bind_param("ii", $id_usuario, $id_produto);
    if ($stmt_rel->execute()) {
        $relacao_status = "salva";
    } else {
        $relacao_status = "erro: " . $stmt_rel->error;
    }
    $stmt_rel->close();
} else {
    echo json_encode(["erro" => "Erro ao criar produto: " . $stmt_prod->error]);
    exit;
}
$stmt_prod->close();
$conn->close();

// 4️⃣ Retornar JSON com status completo
echo json_encode([
    "usuario" => ["id" => $id_usuario, "status" => $usuario_status],
    "produto" => ["id" => $id_produto, "status" => $produto_status],
    "relacao" => ["status" => $relacao_status]
]);
?>
