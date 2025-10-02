<?php
$host = "localhost";
$user = "root";
$pass = ""; // ou "sua_senha", se você configurou uma
$dbname = "test";

// Conexão com MySQL puro
$conn = new mysqli($host, $user, $pass, $dbname);

// Checar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Dados do formulário

$setor = $_POST['setor'];
$fileira = $_POST['fileira'];
$prateleira = $_POST['prateleira'];



// Inserir no banco
$sql = "INSERT INTO localizacoes (setor, fileira, prateleira) VALUES (?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $setor, $fileira, $prateleira); 

if ($stmt->execute()) {
    echo "Produto salvo com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$conn->close();
?>