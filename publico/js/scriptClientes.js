 import Clientes from '../Modelos/Clientes.js';
  function validarCPF(cpf) {
    const regexCPF = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/;
  
    if (!regexCPF.test(cpf)) {
      return false;
    }
  
    const partesCPF = cpf.split('-');
  
    const primeiroDigitoVerificador = calcularDigitoVerificador(partesCPF[0]);
  
    const segundoDigitoVerificador = calcularDigitoVerificador(partesCPF[0] + primeiroDigitoVerificador);
  
    return (
      primeiroDigitoVerificador === parseInt(partesCPF[1]) &&
      segundoDigitoVerificador === parseInt(partesCPF[2])
    );
  
    function calcularDigitoVerificador(numero) {
      const soma = numero
        .split('')
        .map(numero => parseInt(numero))
        .reduce((soma, numero, indice) => soma + (numero * (11 - indice)), 0);
      const resto = soma % 11;
      const digitoVerificador = resto === 0 || resto === 1 ? 0 : 11 - resto;
      return digitoVerificador;
    }};

   
    const formularioCliente = document.getElementById('formCliente');

    formularioCliente.onsubmit = validarFormulario;

    function validarFormulario(evento) {

        if (formularioCliente.checkValidity()) {
          formularioCliente.classList.remove('was-validated');
          const nome = document.getElementById('nome').value;
          const telefone = document.getElementById('telefone').value;
          const email = document.getElementById('email').value;
          const endereco = document.getElementById('endereco').value;
          const cidade = document.getElementById('cidade').value;
          const estado = document.getElementById('estado').value;
          const cpf = document.getElementById('cpf').value;
          const nascimento = document.getElementById('nascimento').value;
          	
          const cliente = new Clientes(nome, telefone, email, endereco, cidade, estado, cpf, nascimento);
          cadastrarCliente(cliente);
        }
       else{
          formularioCliente.classList.add('was-validated');	//diz ao bootstrap exibir mensagens de validação
       }
       evento.preventDefault(); //onsubmit deixa de ter o comportamento padrão de envio de formulário
       evento.stopPropagation(); //Outros interessados no evento de submissão não saberão que ele aconteceu.
      
    }
    function cadastrarCliente(cliente){
      // FETCH API para fazer requisiçoes http
      fetch('http://localhost:3000/clientes', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
       }).then((resposta) => {
            return resposta.json(); 
      }).then((dados) => {
        if(dados.status){
          formularioCliente.reset();
          mostrarMensagem(dados.mensagem, true);

        } else {
          mostrarMensagem(dados.mensagem, false);
        };
        
      })
      .catch(erro) => {
        mostrarMensagem(erro.message, false);
      };
    };

    function mostrarMensagem(mensagem, sucesso = false){
      const divMensagem = document.getElementById('mensagem');

      if (sucesso){
        divMensagem.innerHTML = `
        <div class="alert alert-success" role="alert">
        ${mensagem}
        </div>`	; //string literals
    } 
      else{
        divMensagem.innerHTML=` 
        <div class="alert alert-danger" role="alert">
        ${mensagem} 
        </div>`;
    }
      setTimeout(() => {
        divMensagem.innerHTML = '';
    }, 5000);

}
    