class CalculadoraIMC {

    calcularIMC() {
        let peso = parseFloat(document.getElementById('inputPeso').value)
        let altura = parseFloat(document.getElementById('inputAltura').value)

        let imc = peso / (altura * altura)

        alert("O seu IMC é: " + imc.toFixed(5))
    }

    classificar() {
        let peso = parseFloat(document.getElementById('inputPeso').value)
        let altura = parseFloat(document.getElementById('inputAltura').value)

        let imc = peso / (altura * altura)

        if (imc < 18) {
            document.getElementById('resultado').innerHTML = "<div style='color:red'>Abaixo do Peso</div>"
        }
    }
}

let calculadora = new CalculadoraIMC()