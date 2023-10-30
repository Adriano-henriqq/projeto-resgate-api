require('dotenv').config()
const nodemailer = require('nodemailer');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const async = require('async');
const {enviaEmail, enviaEmailDelay, filaDeEmails} = require('./enviaEmail.js');
const { buscaDados, enviaDados, buscaDadosEnviados,excluiDados } = require('./db/db.js');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(express.static(__dirname));


//api que faz a chamada ao ao banco de dados dos emails ainda nao enviados
app.get('/api/dados',async (req, res) => {
    try {
        const dadosDb = await buscaDados();

        const grupoDe400 = [];
        for(let i = 0; i < dadosDb.length; i+=400) {
            grupoDe400.push(dadosDb.slice(i, i + 400));
        }
        res.json(grupoDe400);
        
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
    const data = req.body.data;
    const dadosRecebidos = req.body.dados;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.PORT,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,

        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    filaDeEmails.push(dadosRecebidos)
    console.log(filaDeEmails)
    res.json('email Adicionado a fila')
    
    enviaEmailDelay(transporter,dadosRecebidos,res)
})


// app.post('/enviar-email-enviados', async (req, res) => {
//     const data = req.body.data;
//     const dadosRecebidos = req.body.dados;
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: process.env.PORT,
//         secure: false,
//         auth: {
//             user: process.env.USER,
//             pass: process.env.PASS,

//         },
//         tls: {
//             rejectUnauthorized: false,
//         }
//     })
//     enviaEmail(transporter,data,dadosRecebidos,res)
// })


app.post('/excluir-dados-enviados', (req, res) => {
    const dadosExcluir = req.body.dadosExcluir;
    dadosExcluir.forEach(dados => {
        excluiDados(dados.nome, dados.email)
    });

    // Chame a função para excluir os dados do banco de dados
   ;

    res.send('Dados excluídos com sucesso!');
});
app.post('/salva-dados', (req, res) => {
    const dados = req.body.dados;
    dados.forEach(dados => {
        enviaDados(dados.nome, dados.email)
    });

    // Chame a função para excluir os dados do banco de dados
   ;

    res.send('Dados salvos na tabela!');
});



app.listen(3000, () => {
    console.log('servidor iniciado em http://localhost:3000')
})