document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listaProdutos");
  const filtroInput = document.getElementById("filtroProduto");
  const filtroRegra = document.getElementById("filtroRegra");
  const ordenacao = document.getElementById("ordenacao");
  const mensagemFiltro = document.getElementById("mensagemFiltro");

  function renderizarProdutos() {
    const termo = filtroInput.value.toLowerCase();
    const regra = filtroRegra.value;
    
    let listaFiltrada = produtos.filter(produto => {
      const matchNome = produto.nome.toLowerCase().includes(termo);
      const matchRegra = regra === "" || produto.regra.includes(regra);
      return matchNome && matchRegra;
    });

    const tipoOrdenacao = ordenacao.value;
    if (tipoOrdenacao === "preco-asc") listaFiltrada.sort((a, b) => a.preco - b.preco);
    else if (tipoOrdenacao === "preco-desc") listaFiltrada.sort((a, b) => b.preco - a.preco);
    else if (tipoOrdenacao === "nome-asc") listaFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));

    container.innerHTML = "";
    if (listaFiltrada.length === 0) {
      mensagemFiltro.textContent = "Nenhum artefato encontrado nesta dimensão.";
      return;
    }
    mensagemFiltro.textContent = "";

    listaFiltrada.forEach(produto => {
      const cardHTML = `
        <article class="col-sm-6 col-lg-4 product-item">
          <div class="card h-100 product-card">
            <div class="product-illustration" role="img" aria-label="${produto.nome}">${produto.icone}</div>
            <div class="card-body d-flex flex-column">
              <p class="small text-secondary mb-1">${produto.categoria} · ${produto.regra}</p>
              <h3 class="h5 text-light">${produto.nome}</h3>
              <p class="text-secondary flex-grow-1">${produto.descricaoCurta}</p>
              <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
              <a class="btn btn-dark mt-2" href="produto.html?id=${produto.id}">Analisar Detalhes</a>
            </div>
          </div>
        </article>
      `;
      container.insertAdjacentHTML("beforeend", cardHTML);
    });
  }

  renderizarProdutos();
  filtroInput.addEventListener("input", renderizarProdutos);
  filtroRegra.addEventListener("change", renderizarProdutos);
  ordenacao.addEventListener("change", renderizarProdutos);
});