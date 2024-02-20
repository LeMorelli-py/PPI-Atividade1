function validarRG(rg) {
    const regexRG = /^([0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{1}|[0-9]{8}\-?[0-9]{1})$/;
  
    if (!regexRG.test(rg)) {
      return false;
    }
  
    const partesRG = rg.split('-');
  
    if (partesRG.length === 2) {
      const digitoVerificador = parseInt(partesRG[1]);
      const soma = partesRG[0]
        .split('')
        .map(numero => parseInt(numero))
        .reduce((soma, numero, indice) => soma + (numero * (9 - indice)), 0);
      const resto = soma % 11;
      const digitoCalculado = resto === 0 || resto === 1 ? 0 : 11 - resto;
      return digitoVerificador === digitoCalculado;
    }
  
    if (partesRG.length === 3) {
      const primeiroDigitoVerificador = parseInt(partesRG[1]);
      const segundoDigitoVerificador = parseInt(partesRG[2]);
      const somaPrimeiroDigito = partesRG[0]
        .split('')
        .map(numero => parseInt(numero))
        .reduce((soma, numero, indice) => soma + (numero * (10 - indice)), 0);
      const restoPrimeiroDigito = somaPrimeiroDigito % 11;
      const digitoCalculadoPrimeiroDigito = restoPrimeiroDigito === 0 || restoPrimeiroDigito === 1 ? 0 : 11 - restoPrimeiroDigito;
  
      const somaSegundoDigito = [primeiroDigitoVerificador, ...partesRG[0].split('')]
        .map(numero => parseInt(numero))
        .reduce((soma, numero, indice) => soma + (numero * (11 - indice)), 0);
      const restoSegundoDigito = somaSegundoDigito % 11;
      const digitoCalculadoSegundoDigito = restoSegundoDigito === 0 || restoSegundoDigito === 1 ? 0 : 11 - restoSegundoDigito;
  
      return (
        primeiroDigitoVerificador === digitoCalculadoPrimeiroDigito &&
        segundoDigitoVerificador === digitoCalculadoSegundoDigito
      );
    }
  
    return false;
  };
  
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

    function validarTelefone(telefone) {
      const regexTelefone = /^(\([1-9]{2}\))\s?((9[0-9]{3}-[0-9]{4})|(8[0-9]{3}-[0-9]{4})|(3[0-9]{3}-[0-9]{4})|(2[0-9]{3}-[0-9]{4})|(1[0-9]{3}-[0-9]{4}))$/;
    
      if (!regexTelefone.test(telefone)) {
        return false;
      }
    
      const telefoneSemCaracteresEspeciais = telefone.replace(/[\(\)\s-]/g, '');
    
      return telefoneSemCaracteresEspeciais.length === 10 || telefoneSemCaracteresEspeciais.length === 11;
    };