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
$setor = $_POST['setor']; // ou $_GET['codigo']
$fileira = $_POST['fileira'];
$prateleira = $_POST['prateleira'];

// Deleta o produto pelo código
$sql = "DELETE FROM localizacoes WHERE setor = ? AND fileira = ? AND prateleira = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $setor, $fileira, $prateleira);

if ($stmt->execute()) {
    echo "Produto deletado com sucesso!";
} else {
    echo "Erro ao deletar: " . $stmt->error;
}

$conn->close();
?>
