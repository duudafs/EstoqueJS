<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";

// Conexão

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Recebe o código via POST
$id_usuario = $_POST['id_usuario']; // ou $_GET['codigo']

// Deleta o produto pelo código
$sql = "DELETE FROM usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);

if ($stmt->execute()) {
    echo "Produto deletado com sucesso!";
} else {
    echo "Erro ao deletar: " . $stmt->error;
}

$conn->close();
?>
