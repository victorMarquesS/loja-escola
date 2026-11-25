document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idUrl = parseInt(params.get("id"));
  const container = document.getElementById("conteudoProduto");
  const produto = produtos.find(p => p.id === idUrl);

  if (!produto) {
    container.innerHTML = `
      <div class="alert alert-danger text-center mt-5">
        <h1 class="h3">Artefato não encontrado!</h1>
        <p>O ID ${idUrl} não existe em nosso catálogo interdimensional.</p>
        <a href="index.html" class="btn btn-accent mt-3">Voltar para a Loja</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <nav aria-label="Caminho de navegação" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html" class="text-accent">Vitrine</a></li>
        <li class="breadcrumb-item active text-muted" aria-current="page">${produto.nome}</li>
      </ol>
    </nav>

    <article class="row g-5 align-items-start">
      <div class="col-lg-6">
        <div class="product-detail-illustration" role="img" aria-label="Ilustração de ${produto.nome}">${produto.icone}</div>
      </div>
      <div class="col-lg-6">
        <p class="eyebrow">${produto.categoria} · ${produto.regra}</p>
        <h1 class="mb-3">${produto.nome}</h1>
        <p class="lead">${produto.descricaoLonga}</p>
        <p class="price price-large mb-4" id="precoBase" data-preco="${produto.preco}">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>

        <section aria-labelledby="titulo-detalhes" class="mb-4 p-3 bg-dark rounded border border-secondary">
          <h2 id="titulo-detalhes" class="h6 text-accent">Ficha Técnica</h2>
          <ul class="mb-0 text-muted">
            <li><strong>Material:</strong> ${produto.material}</li>
            <li><strong>Dimensões:</strong> ${produto.dimensoes}</li>
          </ul>
        </section>

        <form id="formProduto">
          <div class="mb-3">
            <label for="quantidade" class="form-label">Quantidade</label>
            <input class="form-control quantity-field" id="quantidade" type="number" min="1" max="10" value="1">
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="fw-bold">Total:</span>
            <span class="fs-4 text-accent fw-bold" id="totalDinamico">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
          </div>
          <button class="btn btn-accent btn-lg w-100" type="submit">Adquirir Artefato</button>
        </form>
        <div id="produtoFeedback" class="mt-3 text-success fw-bold" role="status" aria-live="polite"></div>
      </div>
    </article>
  `;

  const inputQtd = document.getElementById("quantidade");
  const totalDinamico = document.getElementById("totalDinamico");
  const precoBase = parseFloat(document.getElementById("precoBase").dataset.preco);

  inputQtd.addEventListener("input", () => {
    let qtd = parseInt(inputQtd.value);
    if (isNaN(qtd) || qtd < 1) qtd = 1;
    if (qtd > 10) qtd = 10;
    inputQtd.value = qtd;
    const novoTotal = precoBase * qtd;
    totalDinamico.textContent = `R$ ${novoTotal.toFixed(2).replace('.', ',')}`;
  });

  document.getElementById("formProduto").addEventListener("submit", (e) => {
    e.preventDefault();
    const qtd = parseInt(inputQtd.value);
    const carrinho = {
      produto: produto,
      quantidade: qtd,
      total: produto.preco * qtd
    };
    sessionStorage.setItem("carrinhoImpossivel", JSON.stringify(carrinho));
    window.location.href = "checkout.html";
  });
});