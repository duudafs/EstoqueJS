/*
function mostrarTabelaUsuarioss() {
  document.getElementById("bodyTableUsuarioss").innerHTML = "";
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;



  const produtosPaginados = produtos.slice(inicio, fim);

  let htmlFinal = `
  <tr>
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
<td>${item.nome}</td>
<td>${item.lote}</td>
<td>${item.local}</td>
<td>${item.codigo}</td>
<td>${item.codtinta}</td>
<td>${item.quant}</td>
<td>${item.data}</td>
<td>${item.descric}</td>
<td>
${item.obs}
<br><small class="text-muted">
  Alterado por: ${item.last_modified_by || "—"}
</small>
</td>
<td>
       <button type="button" method="POST" class="delete-btn" onclick="Excluir(${index})"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/></button>
      <button class="edit-btn" onclick="Editar(${index})"><img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/></button>
      </td>
      </tr>
       `;
  });
  document.getElementById("bodyTableUsuarioss").innerHTML = htmlFinal;
  atualizarPaginacaoUsuarioss();
}




function atualizarPaginacaoUsuarioss() {
  const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
  let html = "";

  for (let i = 1; i <= totalPaginas; i++) {
    html += `<button onclick="paginaAtual=${i}; mostrarTabelaUsuarioss()" class="${i === paginaAtual ? 'is-active' : ''}">${i}</button> `;
  }

  document.getElementById("paginacaoUsuarioss").innerHTML = html;
}


function EditarUsuarioss(index) {
  editandoIndex = index;
  let item = produtos[index];


  document.getElementById("nome-edit-user").value = item.nome;
  document.getElementById("lote-edit-user").value = item.lote;
  document.getElementById("local-edit-user").value = item.local;
  document.getElementById("codigo-edit-user").value = item.codigo;
  document.getElementById("codtinta-edit-user").value = item.codtinta;
  document.getElementById("quant-edit-useer").value = item.quant;
  document.getElementById("data-edit-user").value = item.data;
  document.getElementById("descric-edit-user").value = item.descric;
  document.getElementById("obs-edit-user").value = item.obs;

  document.getElementById("meuCardUsuarioss").style.display = "none";
  document.getElementById("CardEditUsuarioss").style.display = "block";


  // Salva o índice para edição
  editandoIndex = index;
}

function SalvarEdicaoUsuarioss(event) {
  event.preventDefault(); // Impede a página de recarregar

  let nome = document.getElementById("nome-edit-user").value.trim();
  let lote = document.getElementById("lote-edit-user").value.trim();
  let local = document.getElementById("local-edit-user").value.trim();
  let codigo = document.getElementById("codigo-edit-user").value.trim();
  let codtinta = document.getElementById("codtinta-edit-user").value.trim();
  let quant = document.getElementById("quant-edit-user").value.trim();
  let data = document.getElementById("data-edit-user").value.trim();
  let descric = document.getElementById("descric-edit-user").value.trim();
  let obs = document.getElementById("obs-edit-user").value.trim();

  console.log({ nome, lote, codigo, codtinta, quant, data, descric, obs });


  if (!nome || !lote || !local || !codigo || !codtinta || !quant || !data || !descric || !obs) {
    alert("Preencha todos os campos!");
    return;
  }
  produtos[editandoIndex] = { nome, lote, local, codigo, codtinta, quant, data, descric, obs };


  fetch('atualizar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `&nome-user=${encodeURIComponent(nome)}&lote-user=${encodeURIComponent(lote)}&local-user=${encodeURIComponent(local)}&codigo-user=${encodeURIComponent(codigo)}&codtinta-user=${encodeURIComponent(codtinta)}&quant-user=${encodeURIComponent(quant)}&data-user=${encodeURIComponent(data)}&descric-user=${encodeURIComponent(descric)}&obs-user=${encodeURIComponent(obs)}`
  })
    .then(response => response.json())
    .then(data => {
      alert("Atualizado com sucesso");

      mostrarTabelausuarioss(); // Atualiza a tabela
      document.getElementById("CardEditUsuarioss").style.display = "none";
      document.getElementById("meuCardUsuarioss").style.display = "none";
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
    body: `codigo-user=${encodeURIComponent(produto.codigo)}`
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      produtos.splice(index, 1);
      mostrarTabelausuarioss();
    })
    .catch(error => console.error('Erro ao deletar:', error));
}

function Salvar(event) {
  event.preventDefault();

  let nome = document.getElementById("nome-user").value;
  let lote = document.getElementById("lote-user").value;
  let local = document.getElementById("local-user").value;
  let codigo = document.getElementById("codigo-user").value;
  let codtinta = document.getElementById("codtinta-user").value;
  let quant = document.getElementById("quant-user").value;
  let data = document.getElementById("data-user").value;
  let descric = document.getElementById("descric-user").value;
  let obs = document.getElementById("obs-user").value;

  if (!nome || !lote || !local || !codigo || !codtinta || !quant || !data || !descric || !obs) {
    alert("Preencha todos os campos!");
    return;
  }


  let novoProduto = {
    nome: nome,
    lote: lote,
    local: local,
    codigo: codigo,
    codtinta: codtinta,
    quant: quant,
    data: data,
    descric: descric,
    obs: obs
  };

  produtos.push(novoProduto);
  mostrarTabelaUsuarioss();

  fetch('salvar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `&nome-user=${encodeURIComponent(nome)}&lote-user=${encodeURIComponent(lote)}&local-user=${encodeURIComponent(local)}&codigo-user=${encodeURIComponent(codigo)}&codtinta-user=${encodeURIComponent(codtinta)}&quant-user=${encodeURIComponent(quant)}&data-user=${encodeURIComponent(data)}&descric-user=${encodeURIComponent(descric)}&obs-user=${encodeURIComponent(obs)}`
  })
    .then(response => response.text())
    .then(data => {
      alert(data);
      document.getElementById("nome-user").value = "";
      document.getElementById("lote-user").value = "";
      document.getElementById("local-user").value = "";
      document.getElementById("codigo-user").value = "";
      document.getElementById("codtinta-user").value = "";
      document.getElementById("quant-user").value = "";
      document.getElementById("data-user").value = "";
      document.getElementById("descric-user").value = "";
      document.getElementById("obs-user").value = "";
      document.getElementById("meuCardUsuarioss").style.display = "none";
      mostrarTabelausuarioss();
    })
    .catch(error => console.error('Erro:', error));
}

*/