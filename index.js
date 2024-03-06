import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import Cliente from './publico/scripts/Clientes.js';
import { error } from 'console';

const host='0.0.0.0'; 
const porta = 3000;  
const app = express();

app.use(express.urlencoded({extended: true})); 

app.use(session({
   secret: '$&n#@',
    resave: false,
   saveUninitialized: true,
   cookie: {  
        maxAge: 60 * 1000 * 15
   }
}))


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


const cliente = new Cliente(0,
                            "Mario da Silva",
                            '1499988888',
                            'email@email',
                            'Rua dos Alfeneiros, 123',
                            "Piraporinha",
                            'SP',
                            "152.152.152-15",
                            '05/05/2005');



cliente.gravar().then(() => {
        console.log('Cliente Cadastrado com sucesso');
}).catch((erro) => {
        console.log(erro.message);
});

/*cliente.atualizar().then(() => {
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

