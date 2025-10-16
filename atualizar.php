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
$codigo = $_POST['codigo'];
$codtinta = $_POST['codtinta'];
$quant = $_POST['quant'];
$data = $_POST['data'];
$descric = $_POST['descric'];
$obs = $_POST['obs'];
$id = $_POST['id']; // ID do produto


$usuario = $_POST['usuario'];
$turno = $_POST['turno'];
$id_usuario = $_POST['id_usuario']; // ID do usuário

// Atualiza o produto pelo ID
$sql_produto = "UPDATE nome_produtos 
    SET nome = ?, lote = ?, local = ?, codigo = ?, codtinta = ?, quant = ?, data = ?, descric = ?, obs = ?
    WHERE id = ?";
$stmt = $conn->prepare($sql_produto);
$stmt->bind_param("sssisisssi", $nome, $lote, $local, $codigo, $codtinta, $quant, $data, $descric, $obs, $id);



$sql_usuario = "UPDATE usuarios 
    SET usuario = ?, turno = ?
    WHERE id_usuario = ?";
$stmt2 = $conn->prepare($sql_usuario);
$stmt2->bind_param("ssi", $usuario, $turno, $id_usuario);

$success = true;
$errors = [];

if (!$stmt->execute()) {
    $success = false;
    $errors[] = "Produto: " . $stmt->error;
}
if (!$stmt2->execute()) {
    $success = false;
    $errors[] = "Usuário: " . $stmt2->error;
}

echo json_encode(["success" => $success, "errors" => $errors]);

$stmt->close();
$stmt2->close();
$conn->close();
?>