import Cliente from "./Cliente.js";

function imprimirMaiorDeIdade() {
  let cli = new Cliente();
  cli.idade = 15;
  if (cli.maiorDeIdade()) {
    alert("MAIOR DE IDADE");
  } else {
    alert("MENOR DE IDADE");
  }
}

document
  .querySelector("#botao")
  .addEventListener("click", imprimirMaiorDeIdade);
