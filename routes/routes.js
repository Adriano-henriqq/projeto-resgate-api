import  Express  from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import 'dotenv/config'
import cors from "cors"
import enviaEmail from "../enviaEmail.js";
import {buscaDados , buscaDadosEnviados, excluiDados, enviaDados} from '../db/db.js'

const app = Express();

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(Express.json())

app.use(cors())
app.get('/api/dados',async (req, res) => {
    try {
        const dadosDb = await buscaDados();


        res.json(dadosDb);
        
    } catch (erro) {
        res.status(500).send('Erro ao buscar dados');
    }

});

app.get('/api/dados-enviados',async (req, res) => {
    try {
        const dadosDb = await buscaDadosEnviados();

        const grupoDe400 = [];
        for(let i = 0; i < dadosDb.length; i+=400) {
            grupoDe400.push(dadosDb.slice(i, i + 400));
        }
        res.json(grupoDe400);
        
    } catch (erro) {
        res.status(500).send('Erro ao buscar dados');
    }

});


app.post('/enviar-email', async (req, res) => {
    const dadosRecebidos = req.body.dados;
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,

        }
       
    })
    
    
 try{
    const envioDeEmails = await enviaEmail(transporter,dadosRecebidos)
    res.json({sucess: true, messages: envioDeEmails})
  }catch(erro){
    res.status(500).json({sucess: false, messages:'erro ao enviar emails: ' + erro.message})
  }finally{
    transporter.close()
  }

})


app.delete('/excluir-dados-enviados', (req, res) => {
    const dadosExcluir = req.body.dadosExcluir;
    dadosExcluir.forEach(dados => {
        excluiDados(dados.value)
    });

    // Chame a função para excluir os dados do banco de dados
   ;

    res.send('Dados excluídos com sucesso!');
});
app.post('/salva-dados', (req, res) => {
    const dados = req.body.dados;
    dados.forEach(dado => {
        const nome = dado.nome
        const email = dado.email

        enviaDados(nome, email)
    });

    // Chame a função para excluir os dados do banco de dados
   ;

    res.send('Dados salvos na tabela!');
});

export default app