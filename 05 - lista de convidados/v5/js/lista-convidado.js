class ListaConvidado {
  constructor() {
    this.cont = 0;
    this.idEdicao = null;
    this.convidados = [];
  }

  carregarConvidados() {
    /*  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        this.convidados = JSON.parse(xhttp.responseText);
        this.gerarTabela();
      }
    };
    xhttp.open(
      "GET",
      "https://fdp-2018-modulo2.herokuapp.com/convidados",
      true
    );
    xhttp.send(); */

    fetch("https://fdp-2018-modulo2.herokuapp.com/convidados")
      .then(resposta => {
        return resposta.json();
      })
      .then(convidados => {
        this.convidados = convidados;
        this.gerarTabela();
      });
  }

  //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  salvarConvidadoAPI(convidado) {
    /*  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        this.carregarConvidados();
      }
    };
    xhttp.open(
      "POST",
      "https://fdp-2018-modulo2.herokuapp.com/convidados",
      true
    );
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(convidado)); */

    fetch("https://fdp-2018-modulo2.herokuapp.com/convidados", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(convidado)
    })
      .then(resposta => {
        return resposta.json();
      })
      .then(json => {
        console.log(json);
        this.carregarConvidados();
      });
  }

  lerConvidado() {
    let convidado = {};

    convidado.nome = document.getElementById("inputNome").value;
    convidado.idade = document.getElementById("inputIdade").value;

    let elementoSexoSelecionado = document.querySelector(
      "input[type=radio]:checked"
    );
    let sexoConvidado = "";

    if (elementoSexoSelecionado != null) {
      convidado.sexo = elementoSexoSelecionado.value;
    }

    return convidado;
  }

  validar(convidado) {
    let erros = "";

    if (convidado.nome == "") {
      erros += "Campo nome é obrigatório!\n";
    }

    if (convidado.idade == "") {
      erros += "Campo idade é obrigatório!\n";
    }

    if (convidado.sexo == "") {
      erros += "Campo sexo obrigatório!\n";
    }

    return erros;
  }

  inserirLinha(convidado) {
    let tabela = document.querySelector("#tbody");
    let linha = tabela.insertRow(0);

    linha.setAttribute("id", "linha-" + convidado.id);
    let celulaNome = linha.insertCell(0);
    let celulaIdade = linha.insertCell(1);
    let celulaSexo = linha.insertCell(2);
    let celulaEditar = linha.insertCell(3);
    let celulaExcluir = linha.insertCell(4);

    let imagemExcluir = document.createElement("img");
    imagemExcluir.setAttribute(
      "onclick",
      "listaConvidado.remover(" + convidado.id + ")"
    );
    imagemExcluir.src = "img/delete.svg";

    let imagemEditar = document.createElement("img");
    imagemEditar.setAttribute(
      "onclick",
      "listaConvidado.editar(" + convidado.id + ")"
    );
    imagemEditar.src = "img/edit.svg";

    celulaNome.innerHTML = convidado.nome;
    celulaIdade.innerHTML = convidado.idade;
    celulaSexo.innerHTML = convidado.sexo;

    celulaEditar.appendChild(imagemEditar);
    celulaExcluir.appendChild(imagemExcluir);
  }

  removerLinha(id) {
    let linhaARemover = document.getElementById("linha-" + id);
    linhaARemover.remove();
  }

  gerarTabela() {
    let tabela = document.querySelector("#tbody");
    tabela.innerHTML = "";

    for (let i = 0; i < this.convidados.length; i++) {
      const convidado = this.convidados[i];
      this.inserirLinha(convidado);
    }
  }

  salvar() {
    if (this.idEdicao == null) {
      this.adicionarAPI();
      this.cont++;
    } else {
      this.salvarEdicao(this.idEdicao);
    }

    this.limparFormulario();
    this.idEdicao = null;
  }

  adicionar(id) {
    let convidado = this.lerConvidado();
    convidado.id = id;

    let erros = this.validar(convidado);

    if (erros != "") {
      window.alert(erros);
      return;
    }

    this.convidados.push(convidado);
    this.gerarTabela(this.convidados);
  }

  adicionarAPI() {
    let convidado = this.lerConvidado();

    let erros = this.validar(convidado);

    if (erros != "") {
      window.alert(erros);
      return;
    }

    this.salvarConvidadoAPI(convidado);
  }

  salvarEdicao(id) {
    // Ler dados
    let convidado = this.lerConvidado();
    convidado.id = id;

    // Atualizar vetor
    for (let i = 0; i < this.convidados.length; i++) {
      const conv = this.convidados[i];
      if (conv.id == convidado.id) {
        this.convidados[i] = convidado;
        break;
      }
    }

    // Atualizar table
    this.gerarTabela(this.convidados);
  }

  remover(id) {
    if (window.confirm("Tem certeza que deseja remover este convidado?")) {
      for (let i = 0; i < this.convidados.length; i++) {
        const convidado = this.convidados[i];
        if (convidado.id == id) {
          this.convidados.splice(i, 1);
        }
      }
      this.gerarTabela(this.convidados);
    }
  }

  editar(id) {
    let convidadoEditar;

    for (let i = 0; i < this.convidados.length; i++) {
      const conv = this.convidados[i];
      if (conv.id == id) {
        convidadoEditar = conv;
        break;
      }
    }

    document.getElementById("inputNome").value = convidadoEditar.nome;
    document.getElementById("inputIdade").value = convidadoEditar.idade;

    if (convidadoEditar.sexo == "M") {
      document.getElementById("inputMasc").checked = true;
    } else {
      document.getElementById("inputFem").checked = true;
    }

    this.idEdicao = convidadoEditar.id;
  }

  limparFormulario() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputIdade").value = "";
    document.querySelector("input[type=radio]:checked").checked = false;
    this.ehEdicao = false;
    this.idEdicao = null;
  }
}

var listaConvidado = new ListaConvidado();
