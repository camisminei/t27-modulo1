function fecharMenu() {
  document.getElementById("menu").classList.add("fechar-menu");
  document.getElementById("main").classList.add("aumentar-main");
  document.getElementById("btn-menu").classList.add("btn-menu-abrir-exibir");
}

function abrirMenu() {
  document.getElementById("menu").classList.remove("fechar-menu");
  document.getElementById("main").classList.remove("aumentar-main");
  document.getElementById("btn-menu").classList.remove("btn-menu-abrir-exibir");
  document.getElementById("menu").classList.add("exibir-menu");
}

function fecharMensagem() {
  document.getElementById("mensagens").classList.remove("show");
}

function validar() {
  // Leitura dos dados
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let sexo = document.querySelector("[type=radio]:checked");
  let cursos = document.querySelector("[type=checkbox]:checked");
  let estado = document.getElementById("estado").value;
  let foto = document.getElementById("foto").files;
  let dataNasc = document.getElementById("datanasc").value;

  let mensagem = "";

  // Comparações
  if (nome == "") {
    mensagem += "Campo nome é obrigatório!!!\n";
  }

  if (email == "") {
    mensagem += "Campo e-mail é obrigatório!!!\n";
  }

  if (sexo == null) {
    mensagem += "Selecione o sexo!!!\n";
  }

  if (cursos == null) {
    mensagem += "Selecione pelo menos um curso!!!\n";
  }

  if (estado == "") {
    mensagem += "Selecione o estado!!!\n";
  }

  if (foto.length == 0) {
    mensagem += "Selecione a foto!!!\n";
  }

  if (dataNasc == "") {
    mensagem += "Selecione a data de nascimento!!!\n";
  }

  if (mensagem != "") {
    document.getElementById("textoMensagem").innerText = mensagem;
    document.getElementById("mensagens").classList.add("show");
  }
}
