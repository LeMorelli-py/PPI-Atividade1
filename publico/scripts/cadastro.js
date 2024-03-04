export default class Clientes{
    #id;
    #nome;
    #telefone;
    #email;
    #endereco;
    #cidade;
    #estado;
    #cpf;
    #nascimento;
 
    constructor(id = 0, nome="", telefone = "", email="", endereco="", cidade="", estado="", cpf="", nascimento=""){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.cpf = cpf;
        this.nascimento = nascimento;
    }
    get id(){
        return this.#id;
    }
    set id(new_id){
        this.#id = id;
    }
    get nome (){
        return this.#nome;
    }
    set nome(new_nome){
        this.#nome = new_nome;
    }
    get telefone(){
        return this.#telefone;
    }
    set telefone(new_telefone){
        this.#telefone = telefone;
    }
    get email(){
        return this.#email;
    }
    set email(new_email){
        this.#email = new_email;
    }
    get endereco(){
        return this.#endereco;
    }
    set endereco(new_endereco){
        this.#endereco = new_endereco;
    }
    get cidade(){
        return this.#cidade;
    }
    set cidade(new_cidade){
        this.#cidade = new_cidade;
    }
    get estado(){
        return this.#estado;
    }
    set estado(new_estado){
        this.#estado = new_estado;
    }
    get cpf(){
        return this.#cpf;
    }
    set cpf(new_cpf){
        this.#cpf = new_cpf;
    }
    get nascimento(){
        return this.#nascimento;
    }
    set nascimento(new_nascimento){
        this.#nascimento = new_nascimento;
    }
    // Armazenar no banco de dados
    gravar(){
        
    }
    atualizar(){
        
    }
    excluir(){
        
    }
    consultar(){
        
    }
}
