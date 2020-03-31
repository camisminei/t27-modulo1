class TodoListController {

    constructor() {
        this.lista = []
        this.idEdicao = null
        this.geradorDeId = 0
    }

    /**
     * método responsável por ler os dados da tela, criar um objeto do tipo tarefa e retornar
     */
    lerTarefa() {
        let tarefa = {}
        tarefa.descricao = document.getElementById("inputDescricao").value
        tarefa.concluida = false

        return tarefa
    }

    /**
     * Método responsável por verificar a validade do objeto lido da tela
     * @param {*} tarefa 
     */
    validar(tarefa) {
        if (tarefa.descricao == "") {
            alert("O campo de descrição da tarefa é obrigatório!")
            return false
        }

        return true
    }


    salvar() {
        let tarefaRetornada = this.lerTarefa()

        if (this.validar(tarefaRetornada)) {

            if (this.idEdicao == null) {
                this.adicionar(tarefaRetornada)
            } else {
                this.salvarEdicao(tarefaRetornada)
            }

            this.limpar()
            this.construirTabela()
        }
    }

    salvarEdicao(tarefa) {
        let i = 0
        let achou = false

        while (i < this.lista.length && !achou) {
            if (this.lista[i].id == this.idEdicao) {
                achou = true
            } else {
                i++
            }
        }

        if (achou) {
            this.lista[i].descricao = tarefa.descricao
            this.limpar()
            this.construirTabela()
        }

        document.getElementById("imgSalvar").src = "img/add.svg"
    }

    /**
     * Método responsável por gerar o id do novo objeto e inseri-lo no Array
     * @param {*} tarefa 
     */
    adicionar(tarefa) {
        tarefa.id = this.geradorDeId
        this.geradorDeId++

        this.lista.push(tarefa)
    }

    limpar() {
        document.getElementById("inputDescricao").value = ""
        this.idEdicao = null
    }

    construirTabela() {
        let tabela = document.getElementById("tabelaTarefas")
        tabela.innerHTML = ""

        for (let i = 0; i < this.lista.length; i++) {
            let linha = tabela.insertRow()

            let celulaConcluida = linha.insertCell()
            let celulaDescricao = linha.insertCell()
            let celulaExcluir = linha.insertCell()
            let celulaEditar = linha.insertCell()

            let imgConcluida = document.createElement("img")
            let imgEditar = document.createElement("img")
            let imgExcluir = document.createElement("img")

            celulaDescricao.innerText = this.lista[i].descricao

            if (this.lista[i].concluida) {
                imgConcluida.src = "img/checked.svg"
            } else {
                imgConcluida.src = "img/unchecked.svg"
            }

            imgConcluida.setAttribute("onclick", `todoListController.alterarStatus(${this.lista[i].id})`)

            imgEditar.src = "img/editar.svg"
            imgEditar.setAttribute("onclick", `todoListController.editar(${this.lista[i].id}, '${this.lista[i].descricao}')`)

            imgExcluir.src = "img/excluir.svg"
            imgExcluir.setAttribute("onclick", `todoListController.excluir(${this.lista[i].id})`)

            celulaConcluida.appendChild(imgConcluida)
            celulaEditar.appendChild(imgEditar)
            celulaExcluir.appendChild(imgExcluir)

        }

    }

    excluir(id) {
        if (confirm("Tem certeza que deseja excluir essa tarefa?")) {
            let i = 0
            let achou = false

            while (i < this.lista.length && !achou) {
                if (this.lista[i].id == id) {
                    achou = true
                } else {
                    i++
                }
            }

            if (achou) {
                this.lista.splice(i, 1)
                this.construirTabela()
            }
        }
    }

    editar(id, descricao) {
        document.getElementById("inputDescricao").value = descricao
        this.idEdicao = id
        document.getElementById("imgSalvar").src = "img/go.svg"
    }

    alterarStatus(id) {
        if (confirm("Tem certeza que deseja alterar o status dessa tarefa?")) {
            let i = 0
            let achou = false

            while (i < this.lista.length && !achou) {
                if (this.lista[i].id == id) {
                    achou = true
                    this.lista[i].concluida = !this.lista[i].concluida
                } else {
                    i++
                }
            }

            this.construirTabela()

        }
    }
}

let todoListController = new TodoListController()