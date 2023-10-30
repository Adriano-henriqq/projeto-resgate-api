
import { enviaDadosParaBackend, excluirDadosEnviados, salvaDadosTabelaEnviados } from "../controlers/enviaDadosBack.js"

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const grupoDe400 = await fetch('/api/dados').then(resposta => resposta.json())
            const tabela = document.getElementById('dados-tabela')
           for(const grupo of grupoDe400){ 
            for (let dado in grupo) {
                let novaLinha = document.createElement('tr')
                novaLinha.classList.add('lista_transition')
                novaLinha.innerHTML = `
                <td><input id = "dados__check" type="checkbox" name="dados__check" value="${grupo[dado].id}" data-nome="${grupo[dado].nome}"
                 data-email="${grupo[dado].email}" ></td>
                <td>${grupo[dado].nome}</td>
                <td>${grupo[dado].email}</td>
                `
                tabela.appendChild(novaLinha)


            }
        }
                    
            return recebeDadosInput();

        return grupoDe400

    } catch (error) {
        console.log(error);
    }
})

function recebeDadosInput() {
    const checkboxMestre = document.querySelector("#check-mestre")
    const checkbox = document.querySelectorAll("#dados__check");
    let dadosEmailSelecionados = [];
    let selecionados = 0;

    
        checkboxMestre.addEventListener("change", function () {
            const limiteSelecao = prompt("Selecione a quantidade de emails a enviar! (apenas numeros)");
            const contadorSelecionados = document.querySelector("[data-contador]")

            checkbox.forEach(cb => {
                if (selecionados < limiteSelecao) {
                    cb.checked = this.checked;
    
                    if (this.checked) {
                        const nome = cb.dataset.nome;
                        const email = cb.dataset.email;
                        dadosEmailSelecionados.push({ nome, email });
                        selecionados++;
                    } else {
                        const indice = dadosEmailSelecionados.findIndex(item => item.email === cb.dataset.email);
                        if (indice !== -1) {
                            dadosEmailSelecionados.splice(indice, 1);
                            selecionados--;
                        }
                    }
                } else {
                    cb.checked = false;
                }
            });
            contadorSelecionados.innerText = `${selecionados} emails selecionados`
            console.log(dadosEmailSelecionados)
        })

        
        const botaoEnviar = document.querySelector("#btnSubmit")
        // aguarda o botao ser selecionado para enviar os dados
        botaoEnviar.addEventListener("click", function (event) {
            event.preventDefault()
    
            if (dadosEmailSelecionados.length <= 0) {
                alert('selecione ao menos uma caixa')
            } else {
                enviaDadosParaBackend(dadosEmailSelecionados)
                excluirDadosEnviados(dadosEmailSelecionados)
                salvaDadosTabelaEnviados(dadosEmailSelecionados)
                removeDadosSelecionados()
                dadosEmailSelecionados = []
                console.log(dadosEmailSelecionados)
                checkboxMestre.checked = false
                selecionados = 0
                window.location.reload()
                
            }
    
    
        })
    
}

function enviaDadosEmail(dadosEmailSelecionados) {
    
}

// faz o envio dos dados do input para o backend


function removeDadosSelecionados() {
    const checkboxSelecionados = document.querySelectorAll("#dados__check:checked");

    checkboxSelecionados.forEach(checkbox => {
        const linha = checkbox.closest('tr');
        linha.remove();
    });
}


export{
    removeDadosSelecionados,
}