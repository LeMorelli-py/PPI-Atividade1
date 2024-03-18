import conectar from "./conexao.js";
import Cliente from "../Modelos/Clientes.js";//DAO - Data Access Object
export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (nome, telefone, email, endereco, 
                         cidade, estado, cpf, nascimento) 
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                cliente.nome,
                cliente.telefone,
                cliente.email,
                cliente.endereco,
                cliente.cidade,
                cliente.estado,
                cliente.cpf,
                cliente.nascimento
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            cliente.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET nome = ?,
                         telefone = ?, email = ?, endereco = ?,
                         cidade = ?, estado = ?, cpf = ?,
                         nascimento = ? WHERE id = ?`;
            const parametros = [
                cliente.nome,
                cliente.telefone,
                cliente.email,
                cliente.endereco,
                cliente.cidade,
                cliente.estado,
                cliente.cpf,
                cliente.nascimento,
                cliente.id
            ];  

           await conexao.execute(sql,parametros);
           
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?`;
            const parametros = [
                cliente.cpf
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código do cliente ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ //termo de pesquina não é um número
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM cliente WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo cliente
        let listaClientes = [];
        for (const registro of registros){
            const cliente = new Cliente(
                registro.id,
                registro.nome,
                registro.telefone,
                registro.email,
                registro.endereco,
                registro.cidade,
                registro.estado,
                registro.cpf,
                registro.nascimento
            );
            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}