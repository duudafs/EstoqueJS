
let paginaAtual = 1;
const itensPorPagina = 10;
let editandoIndex = null;

window.openTab = function (evt, tabName) {
  console.log("Tab clicada:", tabName);

  const tabcontents = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }

  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");


  if (tabName === "Entrada") {
    mostrarTabelaEntrada(); // carrega os produtos na tabela dinamicamente
  } else if (tabName === "Produtos") {
    mostrarTabelaProdutos(); // agora com paginação!
  } else if (tabName === "Localizacao") {
    mostrarTabelaLocalizacao(); // carrega a tabela de localização
  } else if (tabName === "Usuarioss") {
    mostrarTabelaUsuarioss(); // 
  }
};




function buscarProdutos(termo) {
  termo = termo.toLowerCase();

  const produtosFiltrados = produtos.filter(item => {
    if (!item || !item.usuario || !item.nome || !item.lote || !item.local || !item.codigo || !item.codtinta || !item.quant || !item.descric || !item.obs) return false;

    return item.usuario.toLowerCase().includes(termo) ||
      item.nome.toLowerCase().includes(termo) ||
      item.lote.toLowerCase().includes(termo) ||
      item.local.toLowerCase().includes(termo) ||
      item.codigo.toLowerCase().includes(termo) ||
      item.codtinta.toLowerCase().includes(termo) ||
      String(item.quant).toLowerCase().includes(termo) ||
      item.descric.toLowerCase().includes(termo) ||
      item.obs.toLowerCase().includes(termo)
      ;
  });

  // Agora atualiza a tabela com os filtrados
  let htmlFinal = `
    <tr>
     <th>Usuario</th>
      <th>Nome</th>
      <th>Lote</th>
      <th>Localização</th>
      <th>Código</th>
      <th>Código Tinta</th>
      <th>Qntd.</th>
      <th>Data</th>
      <th>Descrição</th>
      <th>OBS</th>
    </tr>
  `;

  produtosFiltrados.forEach(item => {
    htmlFinal += `
      <tr>
        <td>${item.usuario}</td>
        <td>${item.nome}</td>
        <td>${item.lote}</td>
        <td>${item.local}</td>
        <td>${item.codigo}</td>
        <td>${item.codtinta}</td>
        <td>${item.quant}</td>
        <td>${item.data}</td>
        <td>${item.descric}</td>
        <td>${item.obs}</td>
      </tr>
    `;
  });

  document.getElementById("bodyTableProdutos").innerHTML = htmlFinal;
}
document.getElementById("buscarProdutos").addEventListener("input", function () {
  console.log("Digitando busca:", this.value);
  const termo = this.value.trim();
  buscarProdutos(termo);
});





function buscarEntrada(termo) {
  termo = termo.toLowerCase();

  const produtosFiltrados = produtos.filter(item => {
    if (!item || !item.usuario || !item.nome || !item.lote || !item.local || !item.codigo || !item.codtinta || !item.quant || !item.descric || !item.obs) return false;

    return item.usuario.toLowerCase().includes(termo) ||
      item.nome.toLowerCase().includes(termo) ||
      item.lote.toLowerCase().includes(termo) ||
      item.local.toLowerCase().includes(termo) ||
      item.codigo.toLowerCase().includes(termo) ||
      item.codtinta.toLowerCase().includes(termo) ||
      String(item.quant).toLowerCase().includes(termo) ||
      item.descric.toLowerCase().includes(termo) ||
      item.obs.toLowerCase().includes(termo)
      ;
  });

  // Agora atualiza a tabela com os filtrados
  let htmlFinal = `
    <tr>
      <th>Usuario</th>
      <th>Nome</th>
      <th>Lote</th>
      <th>Localização</th>
      <th>Código</th>
      <th>Código Tinta</th>
      <th>Qntd.</th>
      <th>Data</th>
      <th>Descrição</th>
      <th>OBS</th>
      <th>Ações</th>
      
      
      
    </tr>
  `;

  produtosFiltrados.forEach(item => {
    htmlFinal += `
      <tr>

        <td>${item.usuario}</td>
        <td>${item.nome}</td>
        <td>${item.lote}</td>
        <td>${item.local}</td>
        <td>${item.codigo}</td>
        <td>${item.codtinta}</td>
        <td>${item.quant}</td>
        <td>${item.data}</td>
        <td>${item.descric}</td>
        <td>${item.obs}</td>
         
        <td>  
        <button type="button" method="POST" class="delete-btn" onclick="Excluir"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/></button>
          <button class="edit-btn" onclick="Editar"><img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/></button> 
        </td>
      </tr>
    `;
  });

  document.getElementById("bodyTable").innerHTML = htmlFinal;
}
document.getElementById("buscarEntrada").addEventListener("input", function () {
  const termo = this.value.trim();
  buscarEntrada(termo);
});


function mostrarCard() {
  let card = document.getElementById("meuCard");
  card.style.display = "block";
}


function mostrarTabelaProdutos() {
  document.getElementById("bodyTableProdutos").innerHTML = "";
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const produtosPaginados = produtos.slice(inicio, fim);

  let htmlFinal = `
      <tr>
        <th>Usuario</th>
        <th>Nome</th>
        <th>Lote</th>
        <th>Localização</th>
        <th>Código</th>
        <th>Código Tinta</th>
        <th>Qntd.</th>
        <th>Data</th>
        <th>Descrição</th>
        <th>OBS</th>
      </tr>
    `;

  produtosPaginados.forEach(function (item) {
    htmlFinal += `
            <tr>
                <td>${item.usuario}</td>
                <td>${item.nome}</td>
                <td>${item.lote}</td>
                <td>${item.local}</td>
                <td>${item.codigo}</td>
                <td>${item.codtinta}</td>
                <td>${item.quant}</td>
                <td>${item.data}</td>
                <td>${item.descric}</td>
                <td>${item.obs}</td>
            </tr>
        `;
  });

  document.getElementById("bodyTableProdutos").innerHTML = htmlFinal;
  atualizarPaginacaoProdutos();
}

function atualizarPaginacaoProdutos() {
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  let html = "";

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button onclick="paginaAtual=${i}; mostrarTabelaProdutos()" class="${i === paginaAtual ? 'is-active' : ''}">${i}</button>`;
  }

  document.getElementById("paginacaoProdutos").innerHTML = html;
}

function mostrarTabelaEntrada() {
  document.getElementById("bodyTable").innerHTML = "";
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;



  const produtosPaginados = produtos.slice(inicio, fim);

  let htmlFinal = `
      <tr>
        <th>Usuario</th>
        <th>Nome</th>
        <th>Lote</th>
        <th>Localização</th>
        <th>Código</th>
        <th>Código Tinta</th>
        <th>Qntd.</th>
        <th>Data</th>
        <th>Descrição</th>
        <th>OBS</th>
        <th>Ações</th>
        
      </tr>
    `;
  produtosPaginados.forEach(function (item, index) {

    htmlFinal += `
      <tr>
    <td>${item.usuario}</td>
    <td>${item.nome}</td>
  <td>${item.lote}</td>
  <td>${item.local}</td>
  <td>${item.codigo}</td>
  <td>${item.codtinta}</td>
  <td>${item.quant}</td>
  <td>${item.data}</td>
  <td>${item.descric}</td>
  <td>${item.obs}</td>
  <td>
           <button type="button" method="POST" class="delete-btn" onclick="Excluir(${index})"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/></button>
          <button class="edit-btn" onclick="Editar(${index})"><img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/></button>
          </td>
          </tr>
           `;
  });
  document.getElementById("bodyTable").innerHTML = htmlFinal;
  atualizarPaginacao();
}




function atualizarPaginacao() {
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  let html = "";

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button onclick="paginaAtual=${i}; mostrarTabelaEntrada()" class="${i === paginaAtual ? 'is-active' : ''}">${i}</button> `;
  }

  document.getElementById("paginacao").innerHTML = html;
}


function Editar(index) {
  editandoIndex = index;
  let item = produtos[index];


  document.getElementById("nome-edit").value = item.nome;
  document.getElementById("lote-edit").value = item.lote;
  document.getElementById("local-edit").value = item.local;
  document.getElementById("codigo-edit").value = item.codigo;
  document.getElementById("codtinta-edit").value = item.codtinta;
  document.getElementById("quant-edit").value = item.quant;
  document.getElementById("data-edit").value = item.data;
  document.getElementById("descric-edit").value = item.descric;
  document.getElementById("obs-edit").value = item.obs;
  document.getElementById("usuario-edit").value = item.usuario;
  document.getElementById("turno-edit").value = item.turno;

  document.getElementById("meuCard").style.display = "none";
  document.getElementById("CardEdit").style.display = "block";


  // Salva o índice para edição
  editandoIndex = index;
}

function SalvarEdicao(event) {
  event.preventDefault(); // Impede a página de recarregar

  let nome = document.getElementById("nome-edit").value.trim();
  let lote = document.getElementById("lote-edit").value.trim();
  let local = document.getElementById("local-edit").value.trim();
  let codigo = document.getElementById("codigo-edit").value.trim();
  let codtinta = document.getElementById("codtinta-edit").value.trim();
  let quant = document.getElementById("quant-edit").value.trim();
  let data = document.getElementById("data-edit").value.trim();
  let descric = document.getElementById("descric-edit").value.trim();
  let obs = document.getElementById("obs-edit").value.trim();
  let usuario = document.getElementById("usuario-edit").value.trim();
  let turno = document.getElementById("turno-edit").value.trim();

  console.log({ usuario, nome, lote, codigo, codtinta, quant, data, descric, obs });


  if (!usuario || !nome || !lote || !local || !codigo || !codtinta || !quant || !data || !descric || !obs || !turno) {
    alert("Preencha todos os campos!");
    return;
  }
  produtos[editandoIndex] = { usuario, nome, lote, local, codigo, codtinta, quant, data, descric, obs, turno };


  fetch('atualizar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nome=${encodeURIComponent(nome)}&lote=${encodeURIComponent(lote)}&local=${encodeURIComponent(local)}&codigo=${encodeURIComponent(codigo)}&codtinta=${encodeURIComponent(codtinta)}&quant=${encodeURIComponent(quant)}&data=${encodeURIComponent(data)}&descric=${encodeURIComponent(descric)}&obs=${encodeURIComponent(obs)}&turno=${encodeURIComponent(turno)}`
  })

  fetch('atualizarUsuarioss.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `usuario=${encodeURIComponent(usuario)}&turno=${encodeURIComponent(turno)}`
  })

    .then(response => response.json())
    .then(data => {
      alert("Atualizado com sucesso");

      mostrarTabelaEntrada(); // Atualiza a tabela
      document.getElementById("CardEdit").style.display = "none";
      document.getElementById("meuCard").style.display = "none";
    })
    .catch(error => console.error("Erro ao atualizar:", error));
}
// Preenche os campos com os dados do prod

function Excluir(index) {
  const produto = produtos[index];
  

  fetch('deletar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `codigo=${encodeURIComponent(produto.codigo)}`
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      produtos.splice(index, 1);
      mostrarTabelaEntrada();
    })
    .catch(error => console.error('Erro ao deletar:', error));
}

function Salvar(event) {
  event.preventDefault();

  let usuario = document.getElementById("usuario").value;
  let nome = document.getElementById("nome").value;
  let lote = document.getElementById("lote").value;
  let local = document.getElementById("local").value;
  let codigo = document.getElementById("codigo").value;
  let codtinta = document.getElementById("codtinta").value;
  let quant = document.getElementById("quant").value;
  let data = document.getElementById("data").value;
  let descric = document.getElementById("descric").value;
  let obs = document.getElementById("obs").value;
  let turno = document.getElementById("turno").value;

  if (!usuario || !nome || !lote || !local || !codigo || !codtinta || !quant || !data || !descric || !obs || !turno) {
    alert("Preencha todos os campos!");
    return;
  }


  let novoProduto = {
    usuario: usuario,
    nome: nome,
    lote: lote,
    local: local,
    codigo: codigo,
    codtinta: codtinta,
    quant: quant,
    data: data,
    descric: descric,
    obs: obs,
    turno: turno
  };

  produtos.push(novoProduto);
  mostrarTabelaUsuarioss();
  mostrarTabelaEntrada();




  fetch('salvar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `usuario=${encodeURIComponent(usuario)}&turno=${encodeURIComponent(turno)}&nome=${encodeURIComponent(nome)}&lote=${encodeURIComponent(lote)}&local=${encodeURIComponent(local)}&codigo=${encodeURIComponent(codigo)}&codtinta=${encodeURIComponent(codtinta)}&quant=${encodeURIComponent(quant)}&data=${encodeURIComponent(data)}&descric=${encodeURIComponent(descric)}&obs=${encodeURIComponent(obs)}`
  })


    .then(response => response.json())
    .then(data => {
      console.log(data);
      

      document.getElementById("usuario").value = "";
      document.getElementById("nome").value = "";
      document.getElementById("lote").value = "";
      document.getElementById("local").value = "";
      document.getElementById("codigo").value = "";
      document.getElementById("codtinta").value = "";
      document.getElementById("quant").value = "";
      document.getElementById("data").value = "";
      document.getElementById("descric").value = "";
      document.getElementById("obs").value = "";
      document.getElementById("turno").value = "";
      document.getElementById("meuCard").style.display = "none";
      mostrarTabelaEntrada();
    })
    .catch(error => console.error('Erro:', error));
}

function salvarLocalizacaoNoBanco(setor, fileira, prateleira) {
  fetch('salvar_localizacoes.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `setor=${encodeURIComponent(setor)}&fileira=${encodeURIComponent(fileira)}&prateleira=${encodeURIComponent(prateleira)}`
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
      alert("Localização salva com sucesso!");
    })
    .catch(error => console.error('Erro:', error));
}

document.getElementById('addLocalizacao').addEventListener('click', function () {
  let setorInput = document.getElementById('setor');
  let fileiraInput = document.getElementById('fileira');
  let prateleiraInput = document.getElementById('prateleira');

  let setor = setorInput.value.trim();
  let fileira = fileiraInput.value.trim();
  let prateleira = prateleiraInput.value.trim();

  if (setor !== "" && fileira !== "" && prateleira !== "") {
    // adiciona em cada tabela separada
    let tabelaSetor = document.getElementById('setorTable');
    let tabelaFileira = document.getElementById('fileiraTable');
    let tabelaPrateleira = document.getElementById('prateleiraTable');

    tabelaSetor.insertRow().insertCell(0).innerText = setor;
    tabelaFileira.insertRow().insertCell(0).innerText = fileira;
    tabelaPrateleira.insertRow().insertCell(0).innerText = prateleira;

    // salva no banco automaticamente
    salvarLocalizacaoNoBanco(setor, fileira, prateleira);

    // limpa os campos
    setorInput.value = "";
    fileiraInput.value = "";
    prateleiraInput.value = "";
  } else {
    alert("Preencha todos os campos antes de adicionar.");
  }
});
function fecharCard() {
  document.getElementById("meuCard").style.display = "none";
  document.getElementById("CardEdit").style.display = "none";
}



function buscarUsuarioss(termo) {
  termo = termo.toLowerCase();

  const UsuariosFiltrados = usuarios.filter(item => {
    if (!item || !item.id_usuario || !item.usuario || !item.turno) return false;

    return item.id_usuario.toString().includes(termo) ||
      item.usuario.toLowerCase().includes(termo) ||
      item.turno.toLowerCase().includes(termo);

    ;
  });

  // Agora atualiza a tabela com os filtrados
  let htmlFinal = `
  <tr>
    <th>ID</th>
    <th>Usuario</th>
    <th>Turno</th>
    <th>Ações</th>
  </tr>
`;

  UsuariosFiltrados.forEach((item, index) => {
    htmlFinal += `
    <tr>
      <td>${item.id_usuario}</td> 
      <td>${item.usuario}</td>
      <td>${item.turno}</td>
      <td>  
        <button type="button" method="POST" class="delete-btn" onclick="ExcluirUsuarioss(${index})"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/></button>
        <button type="button" method="POST" class="delete-btn" onclick="EditarUsuarioss(${index})"><img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/></button>

          
          
        </td>
      </tr>
    `;
  });

  document.getElementById("bodyTableUsuarioss").innerHTML = htmlFinal;
}
document.getElementById("buscarUsuarioss").addEventListener("input", function () {
  const termo = this.value.trim();
  buscarUsuarioss(termo);
});

function mostrarCardUsuarioss() {
  let card = document.getElementById("meuCardUsuarioss");
  card.style.display = "block";
}


function mostrarTabelaUsuarioss() {
  document.getElementById("bodyTableUsuarioss").innerHTML = "";
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;

  const UsuariosPaginados = usuarios.slice(inicio, fim);

  let htmlFinal = `
    <tr>
      <th>id</th>
      <th>Usuário</th>
      <th>Turno</th>
      <th>Ações</th>
    </tr>
  `;

  UsuariosPaginados.forEach(function (item, index) {
    const realIndex = inicio + index;

    htmlFinal += `
       <tr>
        <td>${item.id_usuario}</td>
        <td>${item.usuario}</td>
        <td>${item.turno}</td>
        <td>
          <button type="button" class="delete-btn" onclick="ExcluirUsuarioss(${realIndex})">
            <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/>
          </button>
          <button type="button" class="edit-btn" onclick="EditarUsuarioss(${realIndex})">
            <img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/>
          </button>
          
        </td>
      </tr>
    `;
  });

  document.getElementById("bodyTableUsuarioss").innerHTML = htmlFinal;
  atualizarPaginacaoUsuarioss();
}



// Paginação
function atualizarPaginacaoUsuarioss() {
  const totalPaginas = Math.ceil(usuarios.length / itensPorPagina);
  let html = "";

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button onclick="paginaAtual=${i}; mostrarTabelaUsuarioss()" class="${i === paginaAtual ? 'is-active' : ''}">${i}</button> `;
  }

  document.getElementById("paginacaoUsuarioss").innerHTML = html;

}

// Editar
function fecharCardUsuarioss() {
  document.getElementById("CardEditUsuarioss").style.display = "none";
}

function EditarUsuarioss(index) {
  editandoIndex = index;
  let item = usuarios[index];
  console.log(item);

  document.getElementById("usuario-edit").value = item.usuario;
  document.getElementById("turno-edit").value = item.turno;


  document.getElementById("CardEditUsuarioss").style.display = "flex";


  // Salva o índice para edição
  editandoIndex = index;
}

function SalvarEdicaoUsuarioss(event) {
  event.preventDefault();

  let usuario = document.getElementById("usuario-edit").value.trim();
  let turno = document.getElementById("turno-edit").value.trim();
  let id_usuario = usuarios[editandoIndex].id_usuario; // 👈 pega o ID

  console.log({ id_usuario, usuario, turno });

  if (!usuario || !turno) {
    alert("Preencha todos os campos!");
    return;
  }

  // Atualiza o array local
  usuarios[editandoIndex] = { id_usuario, usuario, turno };

  fetch('atualizarUsuarioss.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id_usuario=${encodeURIComponent(id_usuario)}&usuario=${encodeURIComponent(usuario)}&turno=${encodeURIComponent(turno)}`
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Atualizado com sucesso");
        mostrarTabelaUsuarioss();
        document.getElementById("CardEditUsuarioss").style.display = "none";
      } else {
        alert("Erro ao atualizar: " + data.error);
      }
    })
    .catch(error => console.error("Erro ao atualizar:", error));
}
// Preenche os campos com os dados do prod

// Excluir
function ExcluirUsuarioss(index) {
  const usuario = usuarios[index];

  fetch('deletarUsuarioss.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id_usuario=${encodeURIComponent(usuario.id_usuario)}`
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      usuarios.splice(index, 1);
      mostrarTabelaUsuarioss();
    })
    .catch(error => console.error('Erro ao deletar:', error));
}












