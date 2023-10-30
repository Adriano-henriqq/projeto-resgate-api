import {enviaDadosParaBackend} from "../controlers/enviaDadosBack.js"
import {removeDadosSelecionados} from "../app/script.js"

document.addEventListener("DOMContentLoaded", async () => {
    alert("Aqui estão os emails enviados, ao enviar um email ele ira desaparecer apenas para o usuario nao se perder no envio, caso recarregue a pagina os dados voltarao a aparecer na tela")
    try {
        const grupoDe400 = await fetch('/api/dados-enviados').then(resposta => resposta.json())
        const tabela = document.getElementById('dados-tabela')
        const linhasDados = tabela.querySelectorAll('tr:not(:first-child)');
        const emailsEnviados = document.querySelector("[data-enviados]")
        linhasDados.forEach(linha => linha.remove());
        let contador = 0;
        for (const grupo of grupoDe400) {
            for (let dado in grupo) {
                let numeroDeEmailsEnviados = parseInt((contador++) + 1)
                emailsEnviados.innerHTML = `Emails enviados até o momento: ${numeroDeEmailsEnviados}`

                let novaLinha = document.createElement('tr')
                novaLinha.innerHTML = `
                <td><input id = "dados__check" type="checkbox" name="dados__check" value="1" data-nome="${grupo[dado].nome}"
                 data-email="${grupo[dado].email}" ></td>
                <td>${grupo[dado].nome}</td>
                <td>${grupo[dado].email}</td>
                `
                tabela.appendChild(novaLinha)


            }
        }

        return recebeDadosDoInput()



    } catch (error) {
        console.log(error);
    }
})



function recebeDadosDoInput() {
    const checkboxes = document.querySelectorAll("#dados__check");
    let dadosEmailSelecionados = [];

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {

            if (this.checked) {
                const nome = checkbox.dataset.nome;
                const email = checkbox.dataset.email;
                dadosEmailSelecionados.push({
                    nome,
                    email
                });

            } else {
                const indice = dadosEmailSelecionados.findIndex(item => item.email === checkbox.dataset.email);
                if (indice !== -1) {
                    dadosEmailSelecionados.splice(indice, 1);

                }
            }


            console.log(dadosEmailSelecionados)
        })
    });



    enviaDadosEmail(dadosEmailSelecionados)
}




function enviaDadosEmail(dadosEmailSelecionados) {
    const botaoEnviar = document.querySelector("#btnSubmit")
    // aguarda o botao ser selecionado para enviar os dados
    botaoEnviar.addEventListener("click", function (event) {
        event.preventDefault()

        if (dadosEmailSelecionados.length <= 0) {
            alert('selecione ao menos uma caixa')
        } else {
            enviaDadosParaBackend(dadosEmailSelecionados)
            removeDadosSelecionados()
            window.location.reload()
            
            

        }


    })
}