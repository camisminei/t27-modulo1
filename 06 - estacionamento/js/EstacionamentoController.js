class EstacionamentoController {
    constructor() {
        this.estacionamento = []
        this.geradorId = 0
        this.carroEdicao = null
    }

    salvar() {
        let carroRetornado = this.lerCarro()

        if (this.validar(carroRetornado)) {

            if (this.carroEdicao == null) {
                this.adicionar(carroRetornado)
            } else {
                carroRetornado.id = this.carroEdicao.id
                this.salvarEdicao(carroRetornado)
            }

            this.gerarTabela()
        }

        this.cancelar()
    }

    calcularResultado() {
        let maisNovo = this.estacionamento[0]
        maisNovo.ano = parseInt(maisNovo.ano)
        let maisVelho = this.estacionamento[0]
        maisVelho.ano = parseInt(maisVelho.ano)
        let somaAnos = 0

        for (let i = 0; i < this.estacionamento.length; i++) {
            let ano = parseInt(this.estacionamento[i].ano)

            somaAnos += ano
            if (maisNovo.ano < ano) {
                maisNovo = this.estacionamento[i]
            }

            if (maisVelho.ano > ano) {
                maisVelho = this.estacionamento[i]
            }
        }

        let media = somaAnos / this.estacionamento.length

        document.getElementById('maisNovo').innerText = JSON.stringify(maisNovo)
        document.getElementById('maisVelho').innerText = JSON.stringify(maisVelho)
        document.getElementById('media').innerText = media
    }

    salvarEdicao(carro) {
        let posicao = null

        for (let i = 0; i < this.estacionamento.length; i++) {
            if (this.estacionamento[i].id == carro.id) {
                posicao = i
            }
        }

        if (posicao != null) {
            this.estacionamento.splice(posicao, 1, carro)
        }
    }

    adicionar(carro) {
        carro.id = this.geradorId
        this.estacionamento.push(carro)
        this.geradorId++
    }

    lerCarro() {
        let carro = {}

        carro.nome = document.getElementById('inputNome').value
        carro.marca = document.getElementById('inputMarca').value
        carro.ano = document.getElementById('inputAno').value

        return carro
    }

    gerarTabela() {
        document.getElementById('tabela-corpo').innerHTML = ""

        for (let i = 0; i < this.estacionamento.length; i++) {
            this.inserirLinha(this.estacionamento[i])
        }
    }

    inserirLinha(carro) {
        let tabela = document.getElementById('tabela-corpo')

        let linha = tabela.insertRow()
        let colunaNome = linha.insertCell(0)
        let colunaMarca = linha.insertCell(1)
        let colunaAno = linha.insertCell(2)
        let colunaEditar = linha.insertCell(3)
        let colunaExcluir = linha.insertCell(4)

        colunaNome.innerText = carro.nome
        colunaMarca.innerText = carro.marca
        colunaAno.innerText = carro.ano

        let imgEditar = document.createElement('img')
        let imgExcluir = document.createElement('img')

        imgEditar.setAttribute('src', 'img/editar.svg')
        imgExcluir.setAttribute('src', 'img/delete.svg')

        imgEditar.setAttribute('onclick', `estacionamentoController.editar(${JSON.stringify(carro)})`)
        imgExcluir.setAttribute('onclick', `estacionamentoController.excluir(${carro.id})`)

        colunaEditar.appendChild(imgEditar)
        colunaExcluir.appendChild(imgExcluir)
    }

    editar(carro) {
        document.getElementById('inputNome').value = carro.nome
        document.getElementById('inputMarca').value = carro.marca
        document.getElementById('inputAno').value = carro.ano

        this.carroEdicao = carro
    }

    excluir(idCarro) {
        let posicao = null

        for (let i = 0; i < this.estacionamento.length; i++) {
            if (this.estacionamento[i].id == idCarro) {
                posicao = i
            }
        }

        if (posicao != null) {
            this.estacionamento.splice(posicao, 1)
        }

        this.gerarTabela()
    }

    cancelar() {
        document.getElementById('inputNome').value = ""
        document.getElementById('inputMarca').value = ""
        document.getElementById('inputAno').value = ""

        this.carroEdicao = null
    }

    validar(carro) {
        if (carro.nome != "" && carro.marca != "" && carro.ano != "") {
            return true
        }

        alert("Preencha todos os campos!")
        return false
    }

}

let estacionamentoController = new EstacionamentoController()