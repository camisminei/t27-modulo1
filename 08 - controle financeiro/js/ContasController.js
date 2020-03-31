class ContasController {
    constructor() {
        this.idEdicao = null
        this.contas = []
        this.empresas = []
        this.geradorId = 0
    }

    fecharMenu() {
        document.getElementById("menu").classList.add("fechar-menu");
        document.getElementById("main").classList.add("aumentar-main");
        document.getElementById("btn-menu").classList.add("btn-menu-abrir-exibir");
    }

    abrirMenu() {
        document.getElementById("menu").classList.remove("fechar-menu");
        document.getElementById("main").classList.remove("aumentar-main");
        document.getElementById("btn-menu").classList.remove("btn-menu-abrir-exibir");
        document.getElementById("menu").classList.add("exibir-menu");
    }

    fecharMensagem() {
        document.getElementById("mensagens").classList.remove("show");
    }

    atualizarEstado() {
        if (localStorage.getItem('empresas') != null) {
            this.empresas = JSON.parse(localStorage.getItem('empresas'))

            let select = document.getElementById('receptor')

            for (let i = 0; i < this.empresas.length; i++) {

                if (this.empresas[i].ativa) {
                    let op = document.createElement('option')
                    op.setAttribute('value', this.empresas[i].id)
                    op.innerText = this.empresas[i].nome
                    select.appendChild(op)
                }
            }
        }

        if (localStorage.getItem('contas') != null) {
            this.contas = JSON.parse(localStorage.getItem('contas'))
        }

        if (localStorage.getItem('geradorIdContas') != null) {
            this.geradorId = JSON.parse(localStorage.getItem('geradorIdContas'))
        }

        this.gerarTabela()
    }

    salvar() {
        let conta = this.lerDados()

        if (this.validar(conta)) {
            if (this.idEdicao == null) {
                this.adicionar(conta)
            } else {
                this.salvarEdicao(conta)
            }

            this.cancelar()
            this.sincronizarLocalStorage()
            this.gerarTabela()
        }
    }

    validar(conta) {
        let mensagem = ""

        if (conta.valor == "") {
            mensagem += "Campo valor é obrigatório!!!\n";
        }

        if (conta.tipo == "") {
            mensagem += "Selecione o tipo da conta!!!\n";
        }

        if (conta.receptor == "") {
            mensagem += "Selecione o receptor da conta!!!\n";
        }

        if (mensagem != "") {
            document.getElementById("textoMensagem").innerText = mensagem
            document.getElementById("mensagens").classList.add("show")

            return false
        }

        return true
    }

    lerDados() {
        let conta = {}

        conta.valor = document.getElementById('valor').value
        conta.tipo = document.getElementById('tipo').value
        conta.paga = document.getElementById('paga').checked
        conta.receptor = document.getElementById('receptor').value

        return conta
    }

    adicionar(conta) {
        conta.id = this.geradorId
        conta.valor = parseFloat(conta.valor)
        let i = 0
        let achou = false

        while (i < this.empresas.length && !achou) {
            if (this.empresas[i].id == conta.receptor) {
                conta.receptor = this.empresas[i]
                achou = true
            }
            i++
        }

        this.contas.push(conta)
        this.geradorId++
    }

    cancelar() {
        document.getElementById('valor').value = ""
        document.getElementById('tipo').value = ""
        document.getElementById('paga').checked = false
        document.getElementById('receptor').value = ""

        this.idEdicao = null
    }

    sincronizarLocalStorage() {
        localStorage.setItem('contas', JSON.stringify(this.contas))
        localStorage.setItem('geradorIdContas', this.geradorId)
    }

    gerarTabela() {
        let tabela = document.getElementById('tabela-corpo')
        tabela.innerHTML = ""

        for (let i = 0; i < this.contas.length; i++) {
            let linha = tabela.insertRow()

            let colunaValor = linha.insertCell()
            let colunaTipo = linha.insertCell()
            let colunaPaga = linha.insertCell()
            let colunaReceptor = linha.insertCell()
            let colunaEditar = linha.insertCell()
            let colunaExcluir = linha.insertCell()

            colunaValor.innerText = this.contas[i].valor
            colunaTipo.innerText = this.contas[i].tipo
            if (this.contas[i].paga) {
                colunaPaga.innerText = "Sim"
            } else {
                colunaPaga.innerText = "Não"
            }

            colunaReceptor.innerText = this.contas[i].receptor.nome

            let imgEditar = document.createElement('img')
            imgEditar.src = "img/editar.svg"
            imgEditar.setAttribute('onclick', `contasController.editar('${this.contas[i].id}')`)
            colunaEditar.appendChild(imgEditar)

            let imgExcluir = document.createElement('img')
            imgExcluir.src = "img/delete.svg"
            imgExcluir.setAttribute('onclick', `contasController.excluir('${this.contas[i].id}')`)

            colunaExcluir.appendChild(imgExcluir)

        }
    }


}

let contasController = new ContasController()