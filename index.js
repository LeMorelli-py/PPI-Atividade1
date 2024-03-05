import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import Cliente from './publico/scripts/cadastro.js';
import { error } from 'console';

const host='0.0.0.0'; //O ip 0.0.0.0 representa todas as interfaces (placas de rede) do computador onde essa aplicação for executada
const porta = 3000;  //Porta identifica um programa em execução no host hospedeiro
const app = express();

app.use(express.urlencoded({extended: true})); //biblioteca qs

//gerencie uma sessão como sendo uma espécie de memória adquirida pelo servidor para lembrar com quem ele conversa
app.use(session({
   secret: '$&n#@',
    resave: false,
   saveUninitialized: true,
   cookie: {  
        maxAge: 60 * 1000 * 15
   }
}))

//O express oferece funcionalidades para permitir que conteúdo estático seja fornecido

app.use(express.static(path.join(process.cwd(), 'publico')));



app.post('/login', (requisicao, resposta)=>{
    const { usuario, senha } = requisicao.body;
    if (usuario && senha && usuario === 'Leandro' && senha === '0526'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect("/main.html");
    } else{
        resposta.redirect('/login.html');
   }
})

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
})

const cliente = new Cliente(2,
                            'Maria João da Silva',
                            '(14) 88888-9999',
                            'mariajoao@email.com',
                            'Rua cinco, 9998',
                            'Campinas',
                            'SP',
                            '152.222.333-44',
                            '01/01/1985');

//nos metodos assincronos é preciso manipular as promesses (promises)
//Então, em algum momento o metodo trará uma resposta e o nosso programa
//não saberá quando isso irá acontecer.
/*cliente.gravar().then(() => {
    console.log('Cliente Cadastrado com sucesso');
}).catch((erro) => {
      console.log(erro.message);
});

cliente.atualizar().then(() => {
    console.log('Cliente atualizado com sucesso');
}).catch((erro) => {
      console.log(erro.message);
});

cliente.excluir().then(() => {
    console.log('Cliente excluído com sucesso');
}).catch((erro) => {
      console.log(erro.message);
});
const clienteQQ = new Cliente();

let listaClientes = [];

clienteQQ.consultar(2).then((listaClientes) => {
    console.log('Clientes encontrados:');
    for (const cliente of listaClientes){
        console.log(cliente.toJSON());
}
}).catch((erro) => {
    console.log(`Nao foi possível encontrar o cliente: ${erro.message}`);
});*/

