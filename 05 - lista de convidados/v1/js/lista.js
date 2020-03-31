let convidados = ""

class GerenciadorLista {

    adicionar() {
        // let input = document.getElementById('inputConvidado')
        // let lista = document.getElementById('lista')

        if (inputConvidado.value == "") {
            alert("Preencha o campo nome!")
        } else {
            convidados = convidados + "\n" + inputConvidado.value
            lista.innerText = convidados
        }

        inputConvidado.value = ""
    }
}

let gerenciador = new GerenciadorLista()