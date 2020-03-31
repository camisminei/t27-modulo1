class MenuController {

    constructor() {

        this.contador = 5;
        this.tentativasNomes = []

    }

    seletorDeOpcoes() {
        let opcao = document.getElementById("numeroOperacao").value

        switch (opcao) {

            case "1":
                this.numerosImpares()
                break

            case "2":
                this.inputEncontraNome()
                break

            case "3":
                this.ocorrenciasDeNumeroUm()
                break

            case "4":
                this.sair()
                break

            default:
                alert("Opcao Inexistente. Por favor, insira alguma das opcoes de 1 a 4")
                break

        }


        // if (opcao != "") {
        //     if (opcao == "1") {
        //         this.numerosImpares()

        //     } else if (opcao == "2") {
        //         this.inputEncontraNome()

        //     } else if (opcao == "3") {
        //         this.ocorrenciasDeNumeroUm()
        //     } else if (opcao == "4") {
        //         this.sair()
        //     } else {
        //         alert("Opcao Inexistente. Por favor, insira alguma das opcoes de 1 a 4")
        //     }
        // } else {
        //     alert("Digite uma opção!")
        // }
    }

    numerosImpares() {
        let impares = ""

        for (let i = 0; i < 101; i++) {

            if (i % 2 != 0) {

                impares += i + " "

            }

        }

        if (impares != "") {
            document.getElementById("operacao").innerText = impares
        }
    }

    encontraNomeSecreto() {

        let nomeSecreto = "pimentao"
        let encontrouNomeDuplicado = false;
        let inputNome = document.getElementById("nome").value

        if (this.contador > 0) {



            if (inputNome != "") {

                if (inputNome == nomeSecreto) {
                    alert("Achou o nome secreto Parabens!")

                    this.tentativasNomes = []
                    this.contador = 5
                    this.voltarMenu()

                } else {
                    let i = 0
                    do {
                        if (inputNome == this.tentativasNomes[i]) {
                            encontrouNomeDuplicado = true
                        }
                        i++
                    } while (!encontrouNomeDuplicado && i <= this.tentativasNomes.length - 1)

                    if (!encontrouNomeDuplicado) {
                        this.contador--
                        this.tentativasNomes.push(inputNome)
                    }
                    document.querySelector("#operacao").innerText = "Tentativas: " + this.tentativasNomes
                    document.querySelector('#divTentativas').innerText = "Você possui " + this.contador + " tentativas."
                    document.getElementById("nome").value = ""
                }


            } else {
                alert("Preencha o campo nome!")
            }
        } else {
            alert("Você não possui mais Tentativas!!")
        }

    }



    inputEncontraNome() {

        let div = document.getElementById('subMenu')
        let inputNome = document.createElement("input")
        inputNome.type = "text"
        inputNome.id = "nome"
        let botaoNovo = document.createElement("button")
        botaoNovo.innerText = "Procurar"
        botaoNovo.id = 'botaoNovoNomeSecreto'
        botaoNovo.setAttribute('onclick', 'menuController.encontraNomeSecreto()')
        let botaoVoltarNomeSecreto = document.createElement("button")
        botaoVoltarNomeSecreto.innerText = "Voltar"
        botaoVoltarNomeSecreto.id = "botaoVoltarNomeSecreto"
        botaoVoltarNomeSecreto.setAttribute('onclick', 'menuController.voltarMenu()')
        let divTentativas = document.createElement("div")
        divTentativas.setAttribute("id", "divTentativas")
        divTentativas.innerText = "Você possui " + this.contador + " tentativas."

        div.appendChild(divTentativas)
        div.appendChild(inputNome)
        div.appendChild(botaoNovo)
        div.appendChild(botaoVoltarNomeSecreto)

    }

    ocorrenciasDeNumeroUm() {

    }

    voltarMenu() {

        document.querySelector("#subMenu").innerHTML = ""
        document.querySelector("#operacao").innerHTML = ""
    }

    sair() {



    }

}

let menuController = new MenuController()