class InversoController {

    constructor() {
        this.vetor = []
    }

    adicionar() {
        let numero = document.getElementById('inputNumero').value

        this.vetor.push(numero)
    }

    imprimir() {
        document.getElementById('imprimirNormal').innerText = this.vetor
    }

    imprimirReverso() {
        let arrayInvertido = ""

        for (let i = this.vetor.length - 1; i >= 0; i--) {
            arrayInvertido += this.vetor[i] + ","
        }

        document.getElementById('imprimirReverso').innerText = arrayInvertido
    }
}

let controller = new InversoController()