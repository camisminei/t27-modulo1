export default class Cliente {
  constructor() {
    this.nome;
    this.idade;
    this.cpf;
    this.endereco;
  }

  maiorDeIdade() {
    return this.idade >= 18 ? true : false;
  }
}
