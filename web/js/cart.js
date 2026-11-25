function getCarrinho() {
    return JSON.parse(localStorage.getItem('carrinhoLoja')) || [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinhoLoja', JSON.stringify(carrinho));
    atualizarBadgeCarrinho();
}

function adicionarAoCarrinho(idProduto, quantidade) {
    let carrinho = getCarrinho();
    let itemIndex = carrinho.findIndex(item => item.id === idProduto);

    if (itemIndex > -1) {
        carrinho[itemIndex].quantidade += quantidade;
    } else {
        carrinho.push({ id: idProduto, quantidade: quantidade });
    }
    salvarCarrinho(carrinho);
}

function removerDoCarrinho(idProduto) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item.id !== idProduto);
    salvarCarrinho(carrinho);
}

function atualizarBadgeCarrinho() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const carrinho = getCarrinho();
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        badge.textContent = totalItens;
        badge.style.display = totalItens > 0 ? 'inline-block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho);