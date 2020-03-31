class Calculadora {

    somar() {
        let n1 = parseFloat(document.getElementById("n1").value)
        let n2 = parseFloat(document.getElementById("n2").value)

        let resultado = n1 + n2

        alert("O resultado da soma é: " + resultado)
    }

    subtrair() {
        let n1 = parseFloat(document.getElementById("n1").value)
        let n2 = parseFloat(document.getElementById("n2").value)

        let resultado = n1 - n2

        alert("O resultado da subtração é: " + resultado)
    }

    multiplicar() {
        let n1 = parseFloat(document.getElementById("n1").value)
        let n2 = parseFloat(document.getElementById("n2").value)

        let resultado = n1 * n2

        alert("O resultado da multiplicação é: " + resultado)
    }

    dividir() {
        let n1 = parseFloat(document.getElementById("n1").value)
        let n2 = parseFloat(document.getElementById("n2").value)

        let resultado = n1 / n2

        alert("O resultado da divisão é: " + resultado)
    }
}

let calculadora = new Calculadora()