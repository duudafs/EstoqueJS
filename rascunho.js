/* 
let paginaAtual = 1;
    const itensPorPagina = 10;

  

    function buscarProdutos(termo) {
      termo = termo.toLowerCase();

      const produtosFiltrados = produtos.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        item.codigo.toLowerCase().includes(termo) // opcional: busca por código também
      );

      // Agora atualiza a tabela com os filtrados
      let htmlFinal = `
    <tr>
      <th>Nome</th>
      <th>Código</th>
      <th>Qntd.</th>
      <th>Data</th>
    </tr>
  `;

      produtosFiltrados.forEach(item => {
        htmlFinal += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.codigo}</td>
        <td>${item.quant}</td>
        <td>${item.date}</td>
      </tr>
    `;
      });

      document.getElementById("bodyTableProdutos").innerHTML = htmlFinal;
    }
    document.getElementById("buscarProdutos").addEventListener("input", function () {
      const termo = this.value.trim();
      buscarProdutos(termo);
    });

    <?php
    $sql = "SELECT nome, codigo, quant FROM nome_produtos ";

    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      
      // output data of each row
      while ($row = $result->fetch_assoc()) { ?>

      
      <?php
      }
    }


    ?>




    function buscarEntrada(termo) {
      termo = termo.toLowerCase();

      const produtosFiltrados = produtos.filter(item =>
        item.nome.toLowerCase().includes(termo) ||
        item.codigo.toLowerCase().includes(termo) // opcional: busca por código também
      );

      // Agora atualiza a tabela com os filtrados
      let htmlFinal = `
    <tr>
      <th>Nome</th>
      <th>Código</th>
      <th>Qntd.</th>
      <th>Data</th>
    </tr>
  `;

      produtosFiltrados.forEach(item => {
        htmlFinal += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.codigo}</td>
        <td>${item.quant}</td>
        <td>${item.date}</td>
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

    const produtos = <?php echo json_encode($produtos); ?>;
    function mostrarTabelaProdutos() {
      document.getElementById("bodyTableProdutos").innerHTML = "";
      let htmlFinal = `
      <tr>
        <th>Nome</th>
        <th>Código</th>
        <th>Qntd.</th>
        <th>Data</th>
      </tr>
    `;

      produtos.forEach(function (item) {
        htmlFinal += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.codigo}</td>
                <td>${item.quant}</td>
                <td>${item.date}</td>
            </tr>
        `;
      });

      document.getElementById("bodyTableProdutos").innerHTML = htmlFinal;
    }

    function mostrarTabelaEntrada() {
      document.getElementById("bodyTable").innerHTML = ""
      const inicio = (paginaAtual - 1) * itensPorPagina;
      const fim = inicio + itensPorPagina;



      const produtosPaginados = produtos.slice(inicio, fim);

      let htmlFinal = `
      <tr>
        <th>Nome</th>
        <th>Código</th>
        <th>Qntd.</th>
        <th>Ações</th>
      </tr>
    `;
      produtosPaginados.forEach(function (item, index) {

        htmlFinal = htmlFinal +
          '<tr>' +
          '<td>' + item.nome + '</td>' +
          '<td>' + item.codigo + '</td>' +
          '<td>' + item.quant + '</td>' +
          '<td>' +
          ' <button type="button" method="POST" class="delete-btn" onclick="Excluir(' + index + ')"><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/trash.png" alt="trash"/></button>' +
          '<button class="edit-btn" onclick="Editar(' + index + ')"><img width="24" height="24" src="https://img.icons8.com/material/24/pencil--v1.png" alt="pencil--v1"/></button>' +
          '</td>' +
          '</tr>'
      });
      document.getElementById("bodyTable").innerHTML = htmlFinal
      atualizarPaginacao();
    }



    function atualizarPaginacao() {
      const totalPaginas = Math.ceil(produtos.length / itensPorPagina);
      let html = "";

      for (let i = 1; i <= totalPaginas; i++) {
        html += `<button onclick="paginaAtual=${i}; mostrarTabelaEntrada()" ${i === paginaAtual ? 'style="font-weight:bold; border-radius: 5px;"' : ''}>${i}</button> `;
      }

      document.getElementById("paginacao").innerHTML = html;
    }


    function Editar(index) {
      let produto = produtos[index];
      

      document.getElementById("nomeEdit").value = produto.nome;
      document.getElementById("codigoEdit").value = produto.codigo;
      document.getElementById("quantEdit").value = produto.quant;
      document.getElementById("dateEdit").value = produto.date;

      document.getElementById("meuCard").style.display = "none";
      document.getElementById("CardEdit").style.display = "block";
      document.getElementById("btnSalvar").style.display = "none";
      document.getElementById("btnSalvarEdit").style.display = "inline-block";

      // Salva o índice para edição
      editandoIndex = index;
    }

    function SalvarEdicao(event) {
  event.preventDefault(); // Impede a página de recarregar

  let nome = document.getElementById("nomeEdit").value;
  let codigo = document.getElementById("codigoEdit").value;
  let quant = document.getElementById("quantEdit").value;
  let date = document.getElementById("dateEdit").value;

  if (!nome || !codigo || !quant) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch('atualizar.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `nome=${encodeURIComponent(nome)}&codigo=${encodeURIComponent(codigo)}&quant=${encodeURIComponent(quant)}&date=${encodeURIComponent(date)}`
  })
    .then(response => response.text())
    .then(data => {
      alert(data); // exibe resposta do PHP
      produtos[editandoIndex] = { nome, codigo, quant, date: date };
      mostrarTabelaEntrada(); // Atualiza a tabela
      document.getElementById("CardEdit").style.display = "none";
      document.getElementById("meuCard").style.display = "block";
    })
    .catch(error => console.error("Erro ao atualizar:", error));
}
    // Preenche os campos com os dados do produto


    // Mostra o formulário






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

      let nome = document.getElementById("nome").value;
      let codigo = document.getElementById("codigo").value;
      let quant = document.getElementById("quant").value;
      let data = document.getElementById("date").value;

      if (!nome || !codigo || !quant) {
        alert("Preencha todos os campos!");
        return;
      }


      let novoProduto = {
        nome: nome,
        codigo: codigo,
        quant: quant,
        date: date
      };

      produtos.push(novoProduto);
      mostrarTabelaEntrada();

      fetch('salvar.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome=${encodeURIComponent(nome)}&codigo=${encodeURIComponent(codigo)}&quant=${encodeURIComponent(quant)}&data=${encodeURIComponent(data)}`
      })
        .then(response => response.text())
        .then(data => {
          alert(data);
          document.getElementById("nome").value = "";
          document.getElementById("codigo").value = "";
          document.getElementById("quant").value = "";
          document.getElementById("meuCard").style.display = "none";
          mostrarTabelaEntrada();
        })
        .catch(error => console.error('Erro:', error));
    }


*/