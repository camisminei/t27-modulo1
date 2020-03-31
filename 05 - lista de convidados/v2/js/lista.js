let contador = 0;
let idEdicao = null

class GerenciadorLista {

    salvar() {
        let input = document.getElementById("inputConvidado");
        let lista = document.getElementById("lista");

        if (input.value == "") {
            alert("Preencha o campo nome!");
        } else {

            if (idEdicao == null) {
                //Entrou na Inserção de um elemento novo

                //Criando os elementos para o novo item da lista
                let divNova = document.createElement("div");
                let span = document.createElement("span");
                let imgRemover = document.createElement("img");
                let imgEditar = document.createElement("img");

                //Adicionando o id da div com contador e incrementando
                divNova.id = "item-" + contador;
                span.id = "span-" + contador;
                contador++;

                //Setando os valores dos elementos
                span.innerText = input.value;
                imgRemover.src = "img/delete.svg";
                imgEditar.src = "img/editar.svg";

                // imgRemover.setAttribute('onclick', "gerenciador.remover('" + divNova.id + "')")
                imgRemover.setAttribute(
                    "onclick",
                    `gerenciador.remover('${divNova.id}')`
                );

                imgEditar.setAttribute(
                    "onclick",
                    `gerenciador.editar('${span.id}')`
                );
                //gerenciador.remover('item-0')

                divNova.appendChild(span);
                divNova.appendChild(imgRemover);
                divNova.appendChild(imgEditar);
                lista.appendChild(divNova);

            } else {
                document.getElementById(idEdicao).innerText = input.value
                idEdicao = null
            }

            input.value = "";
        }
    }

    remover(id) {
        if (confirm("Tem certeza que deseja remover este convidado?"))
            document.getElementById(id).remove();
    }

    editar(id) {
        idEdicao = id
        document.getElementById('inputConvidado').value = document.getElementById(id).textContent
    }
}

let gerenciador = new GerenciadorLista();