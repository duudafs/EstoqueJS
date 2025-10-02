/*
function cadastrarUsuario(event) {
  event.preventDefault(); // evita recarregar a página

  // pegar valores dos campos
  let nome_usuario = document.getElementById("nome_usuario").value;
  let senha = document.getElementById("senha").value;
  let usuario_id = document.getElementById("usuario_id").value;

  fetch('cadastro.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nome_usuario=${encodeURIComponent(nome_usuario)}&senha=${encodeURIComponent(senha)}&usuario_id=${encodeURIComponent(usuario_id)}`
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert("Usuário salvo com sucesso!");


      mostrarTabelaProdutos();
    })
    .catch(error => console.error('Erro:', error));
}

function mostrarCardRegistro() {
  let card = document.getElementById("CardRegistro");
  card.style.display = "block";
  document.getElementById("CardUser").style.display = "none";

}

function LogarUsuario(event) {
  event.preventDefault();

  const nome_usuario = document.getElementById("nome_usuario_login").value;
  const senha = document.getElementById("senha_login").value;
  const usuario_id = document.getElementById("usuario_id_login").value;

  fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `nome_usuario=${encodeURIComponent(nome_usuario)}&senha=${encodeURIComponent(senha)}&usuario_id=${encodeURIComponent(usuario_id)}`
  })
    .then(response => response.json())
    .then(data => {
      if (data.sucesso) {
        alert("Login realizado com sucesso!");
        mostrarAbaProdutos();
      } else {
        alert("Usuário ou senha incorretos!");
      }
    })
    .catch(error => console.error('Erro:', error));
}


*/