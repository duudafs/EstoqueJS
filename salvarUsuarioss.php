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
$nome = $_POST['nome-user'];
$lote = $_POST['lote-user'];
$local = $_POST['local-user']; 
$codigo = $_POST['codigo-user'];
$codtinta = $_POST['codtinta-user'];
$quant = $_POST['quant-user'];
$data = $_POST['data-user'];
$descric = $_POST['descric-user'];
$obs = $_POST['obs-user'];



// Inserir no banco
$sql = "INSERT INTO nome_produtos (nome, lote, local, codigo, codtinta, quant, data, descric, obs)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssisss", $nome,$lote, $local, $codigo, $codtinta,  $quant, $data, $descric, $obs);

if ($stmt->execute()) {
    echo "Produto salvo com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$conn->close();
?>