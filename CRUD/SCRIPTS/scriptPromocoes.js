const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector("#close-modal");
const cancelButton = document.querySelector("#cancelar");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");

const openModal = () => {
    modal.classList.remove("hide");
    fade.classList.remove("hide");
};

const closeModal = () => {
    modal.classList.add("hide");
    fade.classList.add("hide");
    clearFields();
};

// Eventos para abrir e fechar o modal
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
cancelButton.addEventListener('click', closeModal);
fade.addEventListener('click', closeModal);

// Função de acesso ao localStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD: Função Create
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
};

// CRUD: Função Read
const readClient = () => getLocalStorage();

// CRUD: Função Update
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
};

// CRUD: Função Delete
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
};

// Interação do CRUD com o layout

// Validando Campos
const isvalidFields = () => {
    return document.getElementById('form').reportValidity();
};

// Limpando Campos
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
};

// Salvando Informações
const saveClient = () => {
    if (isvalidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            regiao: document.getElementById('regiao').value,
            nivel: document.getElementById('nivel').value
        };
        const index = document.getElementById('nome').dataset.index;
        if (index === 'new') {
            createClient(client);
        } else {
            updateClient(index, client);
        }
        updateTable();
        closeModal();
    }
};

document.getElementById('salvar').addEventListener('click', saveClient);

// Atualizando a tabela no layout

//alterei os buttons para imgs bia
       
const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.regiao}</td>
        <td>${client.nivel}</td>
        <td>  
             <img src="../imgs/icons8-lixeira.svg"  class="exclude" data-action="delete-${index}">
             <img src="../imgs/icons8-editar.svg" class="edit" data-action="edit-${index}">
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
};

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach((client, index) => createRow(client, index));
};

// Limpando a tabela após atualizar
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
};

// Inicializando a tabela ao carregar
updateTable();

// Funções de Editar e Excluir

const EditClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    preencherCampos(client);
    openModal();
};

const preencherCampos = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('regiao').value = client.celular;
    document.getElementById('nivel').value = client.nivel;
    document.getElementById('nome').dataset.index = client.index;
};
 
// editDelete FOI ALTERADO A LOGICA PARA OS ICONES FUNCIONAREM
const editDelete = (event) => {
    const action = event.target.dataset.action; // Pegando o atributo data-action
    if (action) {
        const [type, index] = action.split('-');
        if (type === 'edit') {
            EditClient(index);
        } else if (type === 'delete') {
            deleteClient(index);
            updateTable();
        }
    }
};


document.querySelector('#tableClient>tbody').addEventListener('click', editDelete);

// Captura o campo de pesquisa e a tabela
const pesquisaInput = document.getElementById('pesquisa');
const tabela = document.getElementById('tableClient');
const linhas = tabela.getElementsByTagName('tr');  // Pega todas as linhas da tabela

// Adiciona o evento de digitação no campo de pesquisa
pesquisaInput.addEventListener('input', function() {
    const termoDeBusca = pesquisaInput.value.toLowerCase();  // Converte para minúsculas
    for (let i = 1; i < linhas.length; i++) {  // Começa de 1 para ignorar o cabeçalho
        const celulas = linhas[i].getElementsByTagName('td');  // Pega todas as células da linha
        let linhaVisivel = false;  // Define um indicador para mostrar ou ocultar a linha 

// Itera sobre todas as células da linha
for (let j = 0; j < celulas.length; j++) {
    const textoCelula = celulas[j].textContent || celulas[j].innerText;  // Pega o texto da célula
    if (textoCelula.toLowerCase().includes(termoDeBusca)) {
        linhaVisivel = true;  // Se encontrar uma correspondência, torna a linha visível
    }
}

 // Exibe ou oculta a linha com base na pesquisa
 if (linhaVisivel) {
    linhas[i].style.display = '';  // Exibe a linha
} else {
    linhas[i].style.display = 'none';  // Oculta a linha
}
}
});

//botão para imprimir relatório
const botaoImprimir = document.getElementById("button-imprimir");

botaoImprimir.addEventListener("click",(event)=>{
//pegando o conteudo da tabela e guardando na const conteudo
  const conteudo = document.querySelector('.tabela-conteiner').innerHTML;
//estilo da tabela (tudo isso está dentro da variavel estilo, e os estilos estão sendo concatenados nela)
  let estilo = "<style>";
  // Estilos gerais para a tabela
  // Estilos gerais para a tabela
estilo += "#tableClient {";
estilo += "    width: 100%;";
estilo += "    font-family: Calibri, Arial, sans-serif;"; // Fonte da tabela
estilo += "    font-size: 25px;"; // Tamanho da fonte
estilo += "    border-collapse: collapse;"; // Colapso das bordas internas
estilo += "    border: 2px solid #ddd;"; // Bordas externas
estilo += "}";

// Estilos para o cabeçalho da tabela (thead)
estilo += "#tableClient thead th {";
estilo += "    background-color: #f4f4f4;"; // Cor de fundo suave para o cabeçalho
estilo += "    color: #333;"; // Cor do texto do cabeçalho
estilo += "    padding: 12px 15px;"; // Espaciamento interno das células do cabeçalho
estilo += "    border: 2px solid #ddd;"; // Bordas finas para o cabeçalho
estilo += "    text-align: center;"; // Alinhar o texto no centro
estilo += "    font-weight: bold;"; // Negrito no texto do cabeçalho
estilo += "}";

// Estilos para as células do corpo da tabela (tbody)
estilo += "#tableClient tbody td {";
estilo += "    padding: 10px 15px;"; // Espaciamento interno das células do corpo
estilo += "    border: 2px solid #ddd;"; // Bordas em todas as células do corpo
estilo += "    text-align: center;"; // Alinhar o texto no centro
estilo += "}";

// Estilo para as linhas alternadas no corpo (tbody)
estilo += "#tableClient tbody tr:nth-child(odd) {";
estilo += "    background-color: #f9f9f9;"; // Cor de fundo alternada para as linhas ímpares
estilo += "}";

// Estilo para as linhas do corpo (tbody) quando o mouse passa por cima
estilo += "#tableClient tbody tr:hover {";
estilo += "    background-color: #f1f1f1;"; // Cor de fundo ao passar o mouse por cima
estilo += "    cursor: pointer;"; // Cursor em forma de mão para mostrar que é interativo
estilo += "}";

// Estilos para adicionar bordas laterais no primeiro e último elemento da tabela
estilo += "#tableClient thead th:first-child {";
estilo += "    border-left: 2px solid #ddd;"; // Adiciona borda à esquerda do primeiro th
estilo += "}";

estilo += "#tableClient thead th:last-child {";
estilo += "    border-right: 2px solid #ddd;"; // Adiciona borda à direita do último th
estilo += "}";

estilo += "#tableClient tbody td:first-child {";
estilo += "    border-left: 2px solid #ddd;"; // Adiciona borda à esquerda do primeiro td
estilo += "}";

estilo += "#tableClient tbody td:last-child {";
estilo += "    border-right: 2px solid #ddd;"; // Adiciona borda à direita do último td
estilo += "}";

// Escondendo a coluna "Ações" durante a impressão
estilo += "@media print {";
estilo += "    #tableClient td:nth-child(5),"; // Esconde a 5ª coluna (Ações)
estilo += "    #tableClient th:nth-child(5) {";
estilo += "        display: none;";
estilo += "    }";

  // Adicionando o título para a impressão
estilo += "    #h2-impressao {";
estilo += "        text-align: center;"; // Alinha o título ao centro
estilo += "        font-size: 30px;"; // Tamanho da fonte do título
estilo += "        margin-bottom: 20px;"; // Espaçamento abaixo do título
estilo += "        display: block;"; // Assegura que ele seja exibido na impressão
estilo += "    }";
estilo += "}";

// Fechando a tag <style>
estilo += "</style>";

// ___________________________________________________________________________

//passamos de parametro apenas as features(configuraçoes). O resto passamos vazio;
//dentro da const win, guardamos a funçao do objeto window;
  const win = window.open('', '', 'height = 700, width = 700');

  //escrevendo estilos e conteudos dentro da nova window
  win.document.write('<html>');
  win.document.write('<head>');
  win.document.write('<title>Relatório</title>');
  win.document.write(estilo);
  win.document.write('</head>');
  win.document.write('<body>');
//   escrevendo a tabela na nova janela;
  win.document.write(conteudo);
  win.document.write('</body></html>');

  //da um print na tabela que acabamos de criar
  win.print();
})

// Função de logout
function logout() {
    localStorage.removeItem("loggedIn");
    
    window.location.href = '../PAGES/PaginaLogin.html'; }