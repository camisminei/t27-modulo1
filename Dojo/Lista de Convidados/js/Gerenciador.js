class Gerenciador {
  constructor() {
    this.nome = "";
    this.idade = "";
    this.sexo = "";
    this.contador = 0;
    this.idEditar = null;
  }

  lerDados() {
    this.nome = document.querySelector("#nomeConvidado").value;
    this.idade = document.querySelector("#idadeConvidado").value;

    this.sexo = document.querySelector("[type = radio]:checked");
  }

  validar() {
    if (this.nome != "" && this.idade != "" && this.sexo != null) {
      return true;
    }
    return false;
  }

  inserirLinha() {
    let tabela = document.querySelector("#lista");

    let linha = tabela.insertRow();
    let celulaNome = linha.insertCell(0);
    let celulaIdade = linha.insertCell(1);
    let celulaSexo = linha.insertCell(2);
    let celulaEdit = linha.insertCell(3);
    let celulaExcluir = linha.insertCell(4);

    linha.id = "linha-" + this.contador;
    this.contador++;
    celulaNome.innerText = this.nome;
    celulaIdade.innerText = this.idade;
    celulaSexo.innerText = this.sexo.value;

    let imgEditar = document.createElement("img");
    let imgExcluir = document.createElement("img");

    imgEditar.setAttribute("src", "img/editar.svg");
    imgExcluir.setAttribute("src", "img/delete.svg");

    imgEditar.setAttribute("onclick", `gerenciador.editarLinha('${linha.id}')`);
    imgExcluir.setAttribute(
      "onclick",
      `gerenciador.removerLinha('${linha.id}')`
    );

    celulaEdit.appendChild(imgEditar);
    celulaExcluir.appendChild(imgExcluir);
  }

  limpar() {
    document.querySelector("#nomeConvidado").value = "";
    document.querySelector("#idadeConvidado").value = "";

    if (document.querySelector("[type = radio]:checked") != null) {
      document.querySelector("[type = radio]:checked").checked = false;
    }
    this.nome = "";
    this.idade = "";
    this.sexo = null;
  }

  salvar() {
    this.lerDados();
    if (this.validar()) {
      if (this.idEditar == null) {
        this.inserirLinha();
      } else {
        document.getElementById(this.idEditar).cells[0].innerText = this.nome;
        document.getElementById(this.idEditar).cells[1].innerText = this.idade;
        document.getElementById(
          this.idEditar
        ).cells[2].innerText = this.sexo.value;

        this.idEditar = null;
      }
      this.limpar();
    } else {
      alert("Preencha todos os campos!");
    }
  }

  editarLinha(id) {
    document.querySelector("#nomeConvidado").value = document.getElementById(
      id
    ).children[0].textContent;
    document.querySelector("#idadeConvidado").value = document.getElementById(
      id
    ).children[1].textContent;

    if (document.getElementById(id).children[2].textContent == "f") {
      document.getElementById("fem").checked = true;
    } else {
      document.getElementById("masc").checked = true;
    }
    this.idEditar = id;
  }

  removerLinha(id) {
    if (confirm("Tem ctz que deseja remover?!")) {
      document.getElementById(id).remove();
    }
  }
}

let gerenciador = new Gerenciador();
