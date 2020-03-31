let contador = 0;
let idEdicao = null

class GerenciadorLista {

    salvar() {
        let nome = document.getElementById('inputConvidado').value
        let idade = document.getElementById('inputIdade').value
        let sexo = document.querySelector('[type=radio]:checked')

        let tabela = document.getElementById('lista')

        let linha = document.createElement('tr')
        linha.id = 'linha-' + contador
        contador++
        let colunaNome = document.createElement('td')
        let colunaIdade = document.createElement('td')
        let colunaSexo = document.createElement('td')
        let colunaEditar = document.createElement('td')
        let colunaRemover = document.createElement('td')

        colunaNome.innerText = nome
        colunaIdade.innerText = idade
        colunaSexo.innerText = sexo.value

        let imagemEditar = document.createElement('img')
        let imagemRemover = document.createElement('img')

        imagemEditar.setAttribute('src', 'img/editar.svg')
        imagemRemover.setAttribute('src', 'img/delete.svg')

        colunaEditar.appendChild(imagemEditar)
        colunaRemover.appendChild(imagemRemover)

        linha.appendChild(colunaNome)
        linha.appendChild(colunaIdade)
        linha.appendChild(colunaSexo)
        linha.appendChild(colunaEditar)
        linha.appendChild(colunaRemover)

        tabela.appendChild(linha)

    }

    remover(id) {
        if (confirm("Tem certeza que deseja remover este convidado?"))
            document.getElementById(id).remove();
    }

    editar(id) {
        idEdicao = id
        document.getElementById('inputConvidado').value = document.getElementById(id).textContent
    }
}

let gerenciador = new GerenciadorLista();