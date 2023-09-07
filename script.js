//header


const pudimMenu = document.querySelector('.carrinho');
const navLinks = document.querySelector('.nav-links');

pudimMenu.addEventListener('click', () => {
    navLinks.classList.toggle('mostrar-menu');
});

// ...

    // Array para armazenar os itens no carrinho
    const carrinhoItens = [];

    // Função para atualizar o carrinho na interface
    function atualizarCarrinho() {
        // Recuperar a div do carrinho
        const carrinhoDiv = document.querySelector('.carrinho-itens');
        carrinhoDiv.innerHTML = '';

        // Recalcular o subtotal e total
        let subtotalGeral = 0;

        carrinhoItens.forEach((item, index) => {
            const novoItemDiv = document.createElement('div');
            novoItemDiv.classList.add('carrinho-item');

            const nomeItem = document.createElement('span');
            nomeItem.textContent = item.nome;
            novoItemDiv.appendChild(nomeItem);

            const precoItem = document.createElement('span');
            precoItem.textContent = `R$${item.preco.toFixed(2)}`;
            novoItemDiv.appendChild(precoItem);

            const quantidadeItem = document.createElement('input');
            quantidadeItem.type = 'number';
            quantidadeItem.value = item.quantidade;
            quantidadeItem.min = '0';
            quantidadeItem.style.width = '30px';
            quantidadeItem.addEventListener('change', () => {
                atualizarQuantidade(index, quantidadeItem.value);
            });
            novoItemDiv.appendChild(quantidadeItem);

            const removerItem = document.createElement('button');
            removerItem.type = 'button';
            removerItem.textContent = 'X';
            removerItem.style.width = "40px";
            removerItem.addEventListener('click', () => {
                removerDoCarrinho(index);
            });
            novoItemDiv.appendChild(removerItem);

            carrinhoDiv.appendChild(novoItemDiv);

            subtotalGeral += item.subtotal;
        });

        // Atualizar o total
        const totalElement = document.getElementById('total-carrinho');
        totalElement.textContent = `R$${subtotalGeral.toFixed(2)}`;
    }

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho(nome, preco) {
        const itemExistente = carrinhoItens.find(item => item.nome === nome);

        if (itemExistente) {
            itemExistente.quantidade++;
            itemExistente.subtotal = itemExistente.quantidade * preco;
        } else {
            const novoItem = {
                nome: nome,
                preco: preco,
                quantidade: 1,
                subtotal: preco,
            };
            carrinhoItens.push(novoItem);
        }

        atualizarCarrinho();
    }

    // Função para remover um item do carrinho
    function removerDoCarrinho(index) {
        carrinhoItens.splice(index, 1);
        atualizarCarrinho();
    }

    // Função para atualizar a quantidade de um item no carrinho
    function atualizarQuantidade(index, novaQuantidade) {
        novaQuantidade = parseInt(novaQuantidade);
        if (novaQuantidade >= 0) {
            carrinhoItens[index].quantidade = novaQuantidade;
            carrinhoItens[index].subtotal = novaQuantidade * carrinhoItens[index].preco;
            atualizarCarrinho();
        }
    }

   // Função para finalizar a compra
function finalizarCompra(numeroTelefone) {
    // Construa a mensagem com as informações do carrinho
    let mensagem = "Olá, gostaria de finalizar minha compra. Aqui estão os itens no carrinho:";

    carrinhoItens.forEach((item) => {
        mensagem += `\n${item.nome}: ${item.quantidade}x - R$${item.subtotal.toFixed(2)}`;
    });

    // Encode a mensagem para que ela possa ser incluída na URL
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Use o link da API oficial do WhatsApp para abrir o WhatsApp com a mensagem
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${mensagemCodificada}`;

    // Redirecione para o link do WhatsApp
    window.location.href = linkWhatsapp;

    // Exiba um alerta de compra finalizada (opcional)
    alert('Compra finalizada!');

    // Limpar o carrinho
    carrinhoItens.length = 0;
    atualizarCarrinho();
}

// Exemplo de uso:
finalizarCompra("+558585853533");



    


