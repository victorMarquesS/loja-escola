document.addEventListener("DOMContentLoaded", () => {
  const carrinho = getCarrinho();
  
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Redirecionando...");
    window.location.href = "index.html";
    return;
  }

  const resumoItens = document.getElementById("resumoItens");
  const resumoTotal = document.getElementById("resumoTotal");
  let totalGeral = 0;

  resumoItens.innerHTML = "";
  
  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id === item.id);
    if (produto) {
      const subtotal = produto.preco * item.quantidade;
      totalGeral += subtotal;
      resumoItens.innerHTML += `
        <div class="d-flex justify-content-between mb-2 text-light">
          <span>${item.quantidade}x ${produto.nome}</span>
          <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
      `;
    }
  });

  resumoTotal.textContent = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;

  const telefoneInput = document.getElementById("telefone");
  telefoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) e.target.value = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    else if (val.length > 2) e.target.value = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    else e.target.value = val;
  });

  const cepInput = document.getElementById("cep");
  const btnBuscarCep = document.getElementById("buscarCep");
  const cepFeedback = document.getElementById("cepFeedback");

  btnBuscarCep.addEventListener("click", async () => {
    let cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) {
      cepFeedback.textContent = "O CEP deve ter 8 dígitos numéricos.";
      cepFeedback.className = "form-text text-warning mt-1";
      return;
    }

    cepFeedback.textContent = "Buscando...";
    cepFeedback.className = "form-text text-info mt-1";

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        cepFeedback.textContent = "CEP não encontrado.";
        cepFeedback.className = "form-text text-danger mt-1";
        return;
      }

      document.getElementById("logradouro").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
      
      cepFeedback.textContent = "Endereço preenchido!";
      cepFeedback.className = "form-text text-success mt-1";
      document.getElementById("numero").focus();

    } catch (error) {
      cepFeedback.textContent = "Erro na conexão. Tente novamente.";
      cepFeedback.className = "form-text text-danger mt-1";
    }
  });

  const form = document.getElementById("checkoutForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const cliente = {
      nome: document.getElementById("nome").value,
      total: totalGeral
    };
    
    sessionStorage.setItem("pedidoFinalizado", JSON.stringify(cliente));
    localStorage.removeItem("carrinhoLoja"); // Limpa o carrinho
    window.location.href = "sucesso.html";
  });
});