document.addEventListener("DOMContentLoaded", () => {
  const pedidoData = sessionStorage.getItem("pedidoFinalizado");

  if (!pedidoData) {
    alert("Acesso negado. Nenhuma compra foi identificada.");
    window.location.href = "index.html";
    return;
  }

  const pedido = JSON.parse(pedidoData);
  const numeroPedido = "IMP-" + Math.floor(Math.random() * 900000 + 100000);

  document.getElementById("numeroPedido").textContent = numeroPedido;
  document.getElementById("totalPedido").textContent = `R$ ${pedido.total.toFixed(2).replace('.', ',')}`;
  document.getElementById("nomePedido").textContent = pedido.nome;
  document.getElementById("mensagemCliente").textContent = `Obrigado, ${pedido.nome.split(" ")[0]}! O portal foi aberto e seus itens estão a caminho.`;

  sessionStorage.removeItem("pedidoFinalizado");
});