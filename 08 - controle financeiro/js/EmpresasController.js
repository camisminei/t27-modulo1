class EmpresasController {

    constructor() {
        this.geradorId = 0
        this.empresas = []
        this.idEdicao = null
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
        }

        if (localStorage.getItem('geradorIdEmpresas') != null) {
            this.geradorId = JSON.parse(localStorage.getItem('geradorIdEmpresas'))
        }

        this.gerarTabela()
    }

    lerDados() {
        let empresa = {}

        empresa.nome = document.getElementById('nome').value
        empresa.endereco = document.getElementById('endereco').value
        empresa.cnpj = document.getElementById('cnpj').value
        empresa.razaoSocial = document.getElementById('razaoSocial').value
        empresa.ativa = true

        return empresa
    }

    validar(empresa) {
        let mensagem = ""

        if (empresa.nome == "") {
            mensagem += "Campo nome é obrigatório!!!\n";
        }

        if (empresa.endereco == "") {
            mensagem += "Campo endereço é obrigatório!!!\n";
        }

        if (empresa.cnpj == "") {
            mensagem += "Campo CNPJ é obrigatório!!!\n";
        }

        if (empresa.razaoSocial == "") {
            mensagem += "Campo razão social é obrigatório!!!\n";
        }

        if (mensagem != "") {
            document.getElementById("textoMensagem").innerText = mensagem
            document.getElementById("mensagens").classList.add("show")

            return false
        }

        return true
    }

    cancelar() {
        document.getElementById('nome').value = ""
        document.getElementById('endereco').value = ""
        document.getElementById('cnpj').value = ""
        document.getElementById('razaoSocial').value = ""

        this.idEdicao = null
    }

    gerarTabela() {
        let tabela = document.getElementById('tabela-corpo')
        tabela.innerHTML = ""

        for (let i = 0; i < this.empresas.length; i++) {
            let linha = tabela.insertRow()

            let colunaNome = linha.insertCell()
            let colunaEndereco = linha.insertCell()
            let colunaCnpj = linha.insertCell()
            let colunaRazaoSocial = linha.insertCell()
            let colunaEditar = linha.insertCell()
            let colunaAtivar = linha.insertCell()

            colunaNome.innerText = this.empresas[i].nome
            colunaEndereco.innerText = this.empresas[i].endereco
            colunaCnpj.innerText = this.empresas[i].cnpj
            colunaRazaoSocial.innerText = this.empresas[i].razaoSocial

            let imgEditar = document.createElement('img')
            imgEditar.src = "img/editar.svg"
            imgEditar.setAttribute('onclick', `empresasController.editar('${this.empresas[i].id}')`)
            colunaEditar.appendChild(imgEditar)

            let imgAtivo = document.createElement('img')
            imgAtivo.setAttribute('onclick', `empresasController.alterarStatus('${this.empresas[i].id}')`)

            if (this.empresas[i].ativa) {
                imgAtivo.src = "img/enabled.svg"
            } else {
                imgAtivo.src = "img/disabled.svg"
            }

            colunaAtivar.appendChild(imgAtivo)

        }
    }

    salvar() {
        let empresa = this.lerDados()

        if (this.validar(empresa)) {
            if (this.idEdicao == null) {
                this.adicionar(empresa)
            } else {
                this.salvarEdicao(empresa)
            }

            this.cancelar()
            this.sincronizarLocalStorage()
            this.gerarTabela()
        }
    }

    adicionar(empresa) {
        empresa.id = this.geradorId
        this.empresas.push(empresa)
        this.geradorId++
    }

    sincronizarLocalStorage() {
        localStorage.setItem('empresas', JSON.stringify(this.empresas))
        localStorage.setItem('geradorIdEmpresas', this.geradorId)
    }

    editar(id) {
        let i = 0
        let achou = false

        while (i < this.empresas.length && !achou) {
            if (this.empresas[i].id == id) {
                document.getElementById('nome').value = this.empresas[i].nome
                document.getElementById('endereco').value = this.empresas[i].endereco
                document.getElementById('cnpj').value = this.empresas[i].cnpj
                document.getElementById('razaoSocial').value = this.empresas[i].razaoSocial
                this.idEdicao = id
                achou = true
            }
            i++
        }
    }

    alterarStatus(id) {
        if (confirm("Tem certeza que deseja mudar o status dessa empresa!")) {
            let i = 0
            let achou = false

            while (i < this.empresas.length && !achou) {
                if (this.empresas[i].id == id) {
                    this.empresas[i].ativa = !this.empresas[i].ativa
                    achou = true
                }
                i++
            }

            this.sincronizarLocalStorage()
            this.gerarTabela()
        }
    }

    salvarEdicao(empresa) {
        let i = 0
        let achou = false

        while (i < this.empresas.length && !achou) {
            if (this.empresas[i].id == this.idEdicao) {
                this.empresas[i].nome = empresa.nome
                this.empresas[i].endereco = empresa.endereco
                this.empresas[i].cnpj = empresa.cnpj
                this.empresas[i].razaoSocial = empresa.razaoSocial
                achou = true
            }
            i++
        }
    }

}

let empresasController = new EmpresasController()