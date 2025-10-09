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


$id_usuario = $_POST['id_usuario']; // chave primária do usuário
$usuario = $_POST['usuario'];       // novo nome
$turno = $_POST['turno'];           // novo turno

// Atualiza os dados do usuário
$sql = "UPDATE usuarios SET usuario = ?, turno = ? WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $turno, $usuario, $id_usuario);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>