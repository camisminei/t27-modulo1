class SeparadorController {

    constructor() {
        this.vetor = []
        this.pares = []
        this.impares = []
    }

    adicionar() {
        let numero = parseInt(document.getElementById('inputNumero').value)

        this.vetor.push(numero)

        this.imprimir()
    }

    imprimir() {
        document.getElementById('imprimirNormal').innerText = this.vetor
    }

    separar() {

        for (let i = 0; i < this.vetor.length; i++) {
            if (this.vetor[i] % 2 == 0) {
                this.pares.push(this.vetor[i])
            } else {
                this.impares.push(this.vetor[i])
            }
        }

        document.getElementById('imprimirPares').innerText = "Pares: " + this.pares
        document.getElementById('imprimirImpares').innerText = "Ímpares: " + this.impares
    }
}

let controller = new SeparadorController()