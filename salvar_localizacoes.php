<?php
$host = "localhost";
$user = "root";
$pass = ""; 
$dbname = "test";

// Conexão com MySQL puro
$conn = new mysqli($host, $user, $pass, $dbname);


if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}



$setor = $_POST['setor'];
$fileira = $_POST['fileira'];
$prateleira = $_POST['prateleira'];



// Inserir no banco


$sql = "INSERT INTO localizacoes ( setor, fileira, prateleira) VALUES (?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss",  $setor, $fileira, $prateleira);


if ($stmt->execute()) {
    echo $stmt->insert_id;
} else {
    echo "Erro: " . $stmt->error;
}

   $stmt->close();
$conn->close();
?>