<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "test";



$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}



$setor = $_POST['setor']; 
$fileira = $_POST['fileira'];
$prateleira = $_POST['prateleira'];

// Deleta o produto pelo código
$sql = "DELETE FROM localizacoes WHERE  setor = ? AND fileira = ? AND prateleira = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss",  $setor, $fileira, $prateleira);

if ($stmt->execute()) {
    echo "Localização deletada com sucesso!";
} else {
    echo "Erro ao deletar: " . $stmt->error;
}

$conn->close();
?>