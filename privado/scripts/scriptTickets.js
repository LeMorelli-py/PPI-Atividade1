const opcoesIngresso = document.querySelectorAll('.opcoes-ingresso input[type="radio"]');
const campoQuantidade = document.getElementById('quantidade');
const valorTotalElement = document.getElementById('valor-total');

function atualizarTotal() {
  let valorTotal = 0;
  const valorIngresso = parseInt(opcoesIngresso.find(opcao => opcao.checked).value);
  const quantidade = parseInt(campoQuantidade.value);
  valorTotal = valorIngresso * quantidade;
  valorTotalElement.textContent = valorTotal.toFixed(2);
}

opcoesIngresso.forEach(opcao => opcao.addEventListener('change', atualizarTotal));
campoQuantidade.addEventListener('change', atualizarTotal);

atualizarTotal();

function selecionarFormaPagamento() {
  const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;
  
  if (formaPagamento === "boleto") {
      document.querySelector('.boleto').style.display = "block";
  } else {
      document.querySelector('.boleto').style.display = "none";
  }
  
  if (formaPagamento === "cartao-credito") {
      document.querySelector('#bandeira-cartao').style.display = "block";
  } else {
      document.querySelector
  }
};