async function enviaDadosParaBackend(dados) {
    try {
        const resposta = await fetch("/enviar-email", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dados
            })
        })

        const data = await resposta.json();
        console.log('resposta do back', data)
    } catch (err) {
        console.log('erro gerado', err)
    }
}

//exclui da tabela os 
async function excluirDadosEnviados(dadosExcluir) {
    try {
        const resposta = await fetch("/excluir-dados-enviados", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dadosExcluir
            })
        });

        const data = await resposta.json();
        console.log('resposta do back', data);
    } catch (err) {
        console.log('erro gerado', err);
    }
}

async function salvaDadosTabelaEnviados(dados) {
    try {
        const resposta = await fetch("/salva-dados", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dados
            })
        })

        const data = await resposta.json();
        console.log('resposta do back', data)
    } catch (err) {
        console.log('erro gerado', err)
    }
}

export{
    enviaDadosParaBackend,
    salvaDadosTabelaEnviados,
    excluirDadosEnviados
}