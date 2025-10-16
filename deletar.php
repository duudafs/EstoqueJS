<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";



$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}


$id = $_POST['id']; 

// Deleta o produto pelo código
$sql = "DELETE FROM nome_produtos WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "Produto deletado com sucesso!";
} else {
    echo "Erro ao deletar: " . $stmt->error;
}

$conn->close();
?>
