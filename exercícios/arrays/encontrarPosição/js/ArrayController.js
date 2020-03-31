class ArrayController {

    constructor() {
        this.array = []
        this.contador = 0
    }

    adicionarNoArray() {
        let numero = document.getElementById('inputNumero').value

        this.array[this.contador] = numero
        this.contador++

        this.imprimir()
    }

    imprimir() {
        document.getElementById('resultado').innerText = this.array
    }

    verificar() {
        let valorVerificar = document.getElementById('inputNumeroVerificar').value
        let encontrou = false
        let posicao = -1

        for (let i = 0; i < this.array.length; i++) {
            if (valorVerificar == this.array[i]) {
                encontrou = true
                posicao = i
            }
        }

        if (encontrou) {
            alert(`O valor ${valorVerificar} está contido na posição ${posicao}!`)
        } else {
            alert(`O valor ${valorVerificar} não está contido!`)
        }
    }
}

let controller = new ArrayController()