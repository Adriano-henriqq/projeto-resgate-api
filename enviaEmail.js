const {
    buscaDados, enviaDados, excluiDados
} = require('./db/db.js');


async function enviaEmail(transporter,dados, res) {
    try {
        const dadosConscritos = dados;

        for (let dado in dadosConscritos) {

            const nome = dadosConscritos[dado].nome
            const email = dadosConscritos[dado].email
            

            let dadosEmail = {
                from: 'Comissão de Seleção Permanente das Forças Armadas 10 <cspfa10faltosos@gmail.com>',
                to: email,
                subject: 'Aviso de Débito no Alistamento Obrigatório',
                html: `<h1>Olá ${nome}, Você está em débito com o alistamento obrigatório</h1> 
                <p>A Comissão de Seleção Permanente das Forças Armadas 10, subordinada à 1ª Região Militar, no âmbito do Comando Militar do Leste verificou que o senhor não compareceu a esta CS na data agendada previamente. 
                Desta forma, é indispensável que entre em contato conosco no nosso número de WhatsApp: <a href="https://wa.me/message/FNJ3IPCGOJCIA1">Link do nosso WhatsApp</a> ou <a href="https://wa.me/message/7YSH6H5AMMLHI1">Link do nosso WhatsApp</a> para o agendamento da sua visita junto à CSPFA 10, para regularizar sua situação. A comissão fica 
                situada na Rua Licínio Cardoso, 96 - São Francisco Xavier, Rio de Janeiro - RJ, CEP 20911-015, em frente a estação de Metrô de triagem. Caso já tenha comparecido, favor desconsiderar esta mensagem.</p>`,
                
            }
            try{
               await transporter.sendMail(dadosEmail, (error, info) => {
                    if (error) {
                        return console.log('erro no envio ', error);
                    }
                    console.log('Email enviado: ' + info.response);
                    
                    res.json('Email enviado com sucesso!');
    
                })
            
            }catch(error){
                console.log(`erro no envio para ${email}` , error);
            }
            
        }
    } catch (error) {
        console.error('erro no envio ', error);
    }
}
let filaDeEmails = []
 function enviaEmailDelay(transporter, res){
    if(filaDeEmails.length > 0){
        const proximoEmail = filaDeEmails.shift()
        
        enviaEmail(transporter,proximoEmail,res).then(()=>{
            setTimeout(enviaEmailDelay,1000)
        })
    }
    
    
 }
module.exports = {
    enviaEmail,
    enviaEmailDelay,
    filaDeEmails
}