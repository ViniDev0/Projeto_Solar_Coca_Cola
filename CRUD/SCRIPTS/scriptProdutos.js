// Seletores principais
const openModalButton = document.querySelector(".open-modal");
const closeModalButton = document.querySelector("#close-modal");
const cancelButton = document.querySelector("#cancelar");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const uploadInput = document.getElementById("uploadImagem");
const botaoImagem = document.querySelector(".muda-imagem");

// Variável de controle de imagem
let isNewProduct = true; // Flag para controlar se é um novo produto

// Abrir modal
const openModal = () => {
    if (isNewProduct) {
        resetImage(); // Reseta a imagem se for um novo produto
    }
    clearFields(); // Limpa os campos ao abrir o modal
    modal.classList.remove("hide");
    fade.classList.remove("hide");
};

// Fechar modal
const closeModal = () => {
    modal.classList.add("hide");
    fade.classList.add("hide");
    clearFields();
    if (isNewProduct) {
        resetImage(); // Reseta a imagem ao fechar o modal, caso seja novo produto
    }
};

// Eventos para abrir e fechar o modal
openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
cancelButton.addEventListener("click", closeModal);
fade.addEventListener("click", closeModal);

// LocalStorage
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_produtos")) ?? [];
const setLocalStorage = (dbProdutos) => localStorage.setItem("db_produtos", JSON.stringify(dbProdutos));

// CRUD: Create
const createProduto = (produto) => {
    const dbProdutos = getLocalStorage();
    dbProdutos.push(produto);
    setLocalStorage(dbProdutos);
    console.log("Produto salvo:", produto);
};

// CRUD: Read
const readProduto = () => getLocalStorage();

// CRUD: Update
const updateProduto = (index, produto) => {
    const dbProdutos = readProduto();
    dbProdutos[index] = produto;
    setLocalStorage(dbProdutos);
};

// CRUD: Delete
const deleteProduto = (index) => {
    const dbProdutos = readProduto();
    dbProdutos.splice(index, 1);
    setLocalStorage(dbProdutos);
};

// Validar campos
const isValidFields = () => document.getElementById("form").reportValidity();

// Limpar campos
const clearFields = () => {
    const fields = document.querySelectorAll(".modal-field");
    fields.forEach((field) => (field.value = ""));
    document.getElementById("nome").dataset.index = "new"; // Reseta o índice
};

// Converter imagem para Base64 e armazenar no localStorage
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                // Limitar o tamanho da imagem
                const maxWidth = 200; // Largura máxima
                const maxHeight = 200; // Altura máxima

                // Verifica se a imagem ultrapassa o tamanho máximo
                const widthRatio = maxWidth / img.width;
                const heightRatio = maxHeight / img.height;
                const ratio = Math.min(widthRatio, heightRatio); // Usa o menor valor entre as proporções

                const newWidth = img.width * ratio;
                const newHeight = img.height * ratio;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Converte a imagem redimensionada para Base64
                const base64String = canvas.toDataURL("image/png");

                // Armazena no localStorage e atualiza a imagem do botão
                localStorage.setItem("imagemModal", base64String);
                botaoImagem.src = base64String;
                isNewProduct = false; // Após adicionar a imagem, não reseta mais
            };
        };
        reader.readAsDataURL(file); // Converte o arquivo para Base64
    }
};

// Adicionar evento ao campo de upload
uploadInput.addEventListener("change", handleImageUpload);

// Resetar imagem ao cancelar ou fechar o modal
const resetImage = () => {
    botaoImagem.src = "../imgs/botao-adicionar.png";
    localStorage.removeItem("imagemModal");
    uploadInput.value = ""; // Reseta o campo de upload
    isNewProduct = true; // Reseta a flag para o próximo produto
};

// Salvar produto
const saveProduto = () => {
    if (isValidFields()) {
        const produto = {
            id: document.getElementById("id").value,
            nome: document.getElementById("nome").value,
            descricao: document.getElementById("descricao").value,
            categoria: document.getElementById("categoria").value,
            imagem: localStorage.getItem("imagemModal") || "", // Salva a imagem associada ao produto
        };

        const index = document.getElementById("nome").dataset.index;
        if (index === "new") {
            createProduto(produto);
        } else {
            updateProduto(index, produto);
        }

        updateTable();
        closeModal();
    }
};

document.getElementById("salvar").addEventListener("click", saveProduto);

// Atualizar tabela
const createRow = (produto, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.descricao}</td>
        <td>${produto.categoria}</td>
        <td>
            <img src="../imgs/icons8-lixeira.svg" class="exclude" data-action="delete-${index}">
            <img src="../imgs/icons8-editar.svg" class="edit" data-action="edit-${index}">
        </td>
    `;
    document.querySelector("#tableClient>tbody").appendChild(newRow);
};

const updateTable = () => {
    const dbProdutos = readProduto();
    clearTable();
    dbProdutos.forEach((produto, index) => createRow(produto, index));
};

const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient>tbody tr");
    rows.forEach((row) => row.parentNode.removeChild(row));
};

// Inicializar tabela
updateTable();

// Editar produto
const editProduto = (index) => {
    const produto = readProduto()[index];
    produto.index = index;
    preencherCampos(produto);
    openModal();
};

// Preencher campos no modal
const preencherCampos = (produto) => {
    document.getElementById("id").value = produto.id;
    document.getElementById("nome").value = produto.nome;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("nome").dataset.index = produto.index;

    // Carregar a imagem associada ao produto (se houver)
    botaoImagem.src = produto.imagem || "../imgs/botao-adicionar.png";
    isNewProduct = false; // Marcar que não é um novo produto
};

// Editar ou excluir
const editDelete = (event) => {
    const action = event.target.dataset.action;
    if (action) {
        const [type, index] = action.split("-");
        if (type === "edit") {
            editProduto(index);
        } else if (type === "delete") {
            deleteProduto(index);
            updateTable();
        }
    }
};

document.querySelector("#tableClient>tbody").addEventListener("click", editDelete);

// Seletores
const meuPerfilButton = document.getElementById("meuPerfilButton");
const perfilModal = document.getElementById("perfilModal");
const fade1 = document.getElementById("fade");

// Abrir modal
meuPerfilButton.addEventListener("click", () => {
    perfilModal.classList.remove("hide");
    fade.classList.remove("hide");
});

// Fechar modal ao clicar fora
fade.addEventListener("click", () => {
    perfilModal.classList.add("hide");
    fade.classList.add("hide");
});
