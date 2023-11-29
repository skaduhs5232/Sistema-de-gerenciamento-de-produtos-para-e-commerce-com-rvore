// Estrutura de dados simulada
let produtos = [
    { id: '1', name: 'Celular', description: 'Samsung', price: 1.099, category: 'eletronico' },
    { id: '2', name: 'Notebook', description: 'Notebook Lenovo', price: 2.099, category: 'eletronico' },
    { id: '3', name: 'Colher', description: 'Só uma colher', price: 3.99, category: 'cozinha' },
];

function addProduct() {
    // Obter valores dos campos do formulário
    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productCategory = document.getElementById("productCategory").value;

    // Criar um novo objeto de produto
    const newProduct = {
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        category: productCategory
    };

    // Adicionar o novo produto ao array 'produtos'
    produtos.push(newProduct);

    // Exibir mensagem de sucesso no modal
    showModal("Produto adicionado com sucesso!");

    // Atualizar a exibição de todos os produtos
    showAllProducts();

    // Limpar campos do formulário
    clearForm("addProductForm");
}

// Função para exibir o modal
function showModal(message) {
    const modal = document.getElementById("myModal");
    const modalMessage = document.getElementById("modalMessage");

    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}
// Função para buscar um produto pelo ID
function searchProduct() {
    const searchProductId = document.getElementById("searchProductId").value;

    // Procurar o produto no array 'produtos'
    const foundProduct = produtos.find(product => product.id === searchProductId);

    // Elemento HTML para exibir o resultado da busca
    const searchResultElement = document.getElementById("searchResult");
    searchResultElement.innerHTML = ""; // Limpar conteúdo anterior

    if (foundProduct) {
        // Se o produto for encontrado, exibir suas informações
        const productInfo = document.createElement("div");
        productInfo.innerHTML = `<strong>Produto encontrado:</strong><br>
                                <strong>ID:</strong> ${foundProduct.id}<br>
                                <strong>Nome:</strong> ${foundProduct.name}<br>
                                <strong>Descrição:</strong> ${foundProduct.description}<br>
                                <strong>Preço:</strong> ${foundProduct.price}<br>
                                <strong>Categoria:</strong> ${foundProduct.category}`;
        searchResultElement.appendChild(productInfo);
    } else {
        // Se o produto não for encontrado, exibir mensagem correspondente
        const notFoundMessage = document.createElement("p");
        notFoundMessage.textContent = "Produto não encontrado.";
        searchResultElement.appendChild(notFoundMessage);
    }

    // Limpar campos do formulário
    clearForm("searchProductForm");
}

// Função para atualizar o preço e descrição de um produto
function updateProduct() {
    const updateProductId = document.getElementById("updateProductId").value;
    const newPrice = document.getElementById("newPrice").value;
    const newDescription = document.getElementById("newDescription").value;

    // Encontrar o índice do produto a ser atualizado no array 'produtos'
    const foundProductIndex = produtos.findIndex(product => product.id === updateProductId);

    if (foundProductIndex !== -1) {
        // Se o produto for encontrado, atualizar preço e descrição
        produtos[foundProductIndex].price = newPrice;
        produtos[foundProductIndex].description = newDescription;

        // Exibir mensagem de sucesso
        showModal("Produto atualizado com sucesso!");
    } else {
        // Se o produto não for encontrado, exibir mensagem correspondente
        showModal("Produto não encontrado.");
    }

    // Limpar campos do formulário
    clearForm("updateProductForm");
}

// Função para listar produtos de uma categoria específica
function listProducts() {
    const listCategory = document.getElementById("listCategory").value;

    // Filtrar produtos pelo campo 'category'
    const filteredProducts = produtos.filter(product => product.category === listCategory);

    // Elemento HTML para exibir o resultado da listagem
    const listResultElement = document.getElementById("listResult");
    listResultElement.innerHTML = "";

    if (filteredProducts.length > 0) {
        // Se produtos forem encontrados, criar listagem
        filteredProducts.forEach(product => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<strong>ID:</strong> ${product.id}, <strong>Nome:</strong> ${product.name}, <strong>Preço:</strong> ${product.price}`;
            listResultElement.appendChild(listItem);
        });
    } else {
        // Se nenhum produto for encontrado, exibir mensagem correspondente
        const listItem = document.createElement("li");
        listItem.textContent = "Nenhum produto encontrado para esta categoria.";
        listResultElement.appendChild(listItem);
    }

    // Limpar campo do formulário
    clearForm("listProductsForm");
}

// Função para exibir todos os produtos na tabela
function showAllProducts() {
    const allProductsList = document.getElementById('allProductsList');

    // Verifica se a tabela existe no HTML
    if (!allProductsList) {
        console.error('Tabela não encontrada. Certifique-se de que a tabela tem o id "allProductsList".');
        return;
    }

    // Limpa o conteúdo anterior da tabela
    allProductsList.innerHTML = '';

    // Adiciona as linhas da tabela
    produtos.forEach(product => {
        const row = document.createElement('tr');
        row.classList.add('product-item');

        // Criação das células (td) para cada propriedade do produto
        const idCell = document.createElement('td');
        idCell.textContent = product.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;
        row.appendChild(categoryCell);

        // Adiciona a linha à tabela
        allProductsList.appendChild(row);
    });
}

// Chama a função para exibir todos os produtos após o carregamento do DOM
document.addEventListener('DOMContentLoaded', showAllProducts);

// Função para limpar os campos de um formulário
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
}

// Função para alternar entre modos de visualização (Dark Mode)
function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

// Torna os cards com a classe 'card' e 'cardLista' arrastáveis
$(document).ready(function () {
    $(".card").draggable({ containment: "body", scroll: false });
    $(".cardLista").draggable({ containment: "body", scroll: false });
});

function resetCardPositions() {
    // Recupera todas as classes de card e redefine suas posições
    $(".card").each(function () {
        $(this).css({ top: 0, left: 0 });
    });

    $(".cardLista").each(function () {
        $(this).css({ top: 0, left: 0 });
    });
}

$(document).ready(function () {
    generateConfetti();

    // Pare a geração de confetes após 5 segundos
   
});

function generateConfetti() {
    var confettiContainer = $("#confetti-container");
    var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"]; // Adicione mais cores conforme necessário

    for (var i = 0; i < 100; i++) {
        var confetti = $("<div class='confetti'></div>");

        confetti.css({
            left: Math.random() * 100 + "vw",
            top: Math.random() * 100 + "vh",
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            animationDuration: Math.random() * 2 + 1 + "s",
            animationDelay: Math.random() + "s",
        });

        confettiContainer.append(confetti);
    }
}

