<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";



$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}


$id_usuario = $_POST['id_usuario']; 


$sql = "DELETE FROM usuarios WHERE id_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);

if ($stmt->execute()) {
    echo "Usuário deletado com sucesso!";
} else {
    echo "Erro ao deletar: " . $stmt->error;
}

$conn->close();
?>
