<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => $conn->connect_error]));
}

// Recebe os dados do POST
$usuario = $_POST['usuario'] ?? '';
$turno = $_POST['turno'] ?? '';
$id_usuario = $_POST['id_usuario'] ?? 0;

// Atualiza os dados do usuário
$sql = "UPDATE usuarios SET usuario = ?, turno = ? WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $usuario, $turno, $id_usuario);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
