
async function enviaEmail(transporter,dados, res) {
    try {
        const dadosConscritos = dados;
        const promises = []
        for (let dado in dadosConscritos) {

            const nome = dadosConscritos[dado].nome
            const email = dadosConscritos[dado].email
            
            if(!email) {
                console.log(`Email vazio, para o nome ${nome} pulando para o proximo email`)
            }
            let dadosEmail = {
                from: 'Comissão de Seleção Permanente das Forças Armadas 10 <cspfa10faltosos@gmail.com>',
                to: email,
                subject: 'Aviso de Débito no Alistamento Obrigatório',
                html: `<h1>Olá ${nome}, Você está em débito com o alistamento obrigatório</h1> 
                <p>A Comissão de Seleção Permanente das Forças Armadas 10, subordinada à 1ª Região Militar, no âmbito do Comando Militar do Leste verificou que o senhor não compareceu a esta CS na data agendada previamente. 
                Desta forma, é indispensável que entre em contato conosco no nosso número de WhatsApp: <a href="https://wa.me/message/FNJ3IPCGOJCIA1">Link do nosso WhatsApp</a> ou <a href="https://wa.me/message/7YSH6H5AMMLHI1">Link do nosso WhatsApp</a> para o agendamento da sua visita junto à CSPFA 10, para regularizar sua situação. A comissão fica 
                situada na Rua Licínio Cardoso, 96 - São Francisco Xavier, Rio de Janeiro - RJ, CEP 20911-015, em frente a estação de Metrô de triagem. Caso já tenha comparecido, favor desconsiderar esta mensagem.</p>`,
                
            }
            
               
                const emailPromise = new Promise((resolve, reject) => {
                    transporter.sendMail(dadosEmail, (error, info) => {
                        if (error) {
                            reject(`Erro no envio para ${email}: ${error}`);
                        } else {
                            console.log(`Email enviado para: ${email} - ${info.response}`);
                            resolve(`Email enviado com sucesso para: ${nome} com o Email: ${email}`);
                        }
                    });
                });

                promises.push(emailPromise)
            
            
        }
        try{
            const resultados = await Promise.all(promises);
            return resultados;     
          }catch(error){
              console.log(`erro no envio para ${email}` , error);
          }
    } catch (error) {
        console.error('erro no envio ', error);
    }
}
// let filaDeEmails = []
//  function enviaEmailDelay(transporter, res){
//     if(filaDeEmails.length > 0){
//         const proximoEmail = filaDeEmails.shift()
        
//         enviaEmail(transporter,proximoEmail,res).then(()=>{
//             setTimeout(enviaEmailDelay,1000)
//         })
//     }
    
    
//  }
 
  export default enviaEmail
   