const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'banco-cs10'
});
// faz uma consulta ao banco de dados
 function buscaDados(){
    return new Promise((resolve, reject) =>{
  
      conexao.query('SELECT * FROM `teste1`', (err, resultado, campos) => {
       if(err){
           console.log('erro ao executar consulta', err);
           reject(err)
           return
       }
       
       resolve(resultado)

       
       })
    })
  }

  function buscaDadosEnviados(){
    return new Promise((resolve, reject) =>{
  
      conexao.query('SELECT * FROM `dados_cs_csv`', (err, resultado, campos) => {
       if(err){
           console.log('erro ao executar consulta', err);
           reject(err)
           return
       }
       
       resolve(resultado)

       
       })
    })
  }
// envia os dados para a tabela de emails enviados
  function enviaDados(nome, email) {
    const query = `INSERT INTO dados_cs_csv (nome, email) VALUES ('${nome}', '${email}')`;
    conexao.query(query, (error, results, fields) => {
      if (error) throw error;
      console.log(`Novo usuário inserido com ID: ${results.insertId}`);
    });
  }
  
  //exclui os dados da tabela de emails nao enviados
  // function excluiDados(nome,email){
  //   const query = "DELETE FROM `teste1` WHERE nome = ? AND email = ?";
  //   const value = [nome,email];
  //   conexao.query(query, value, (err, results) => {
  //    if(err) throw err;
  //    console.log(`foram excluidos os dados ${results.affectedRows} para ${nome} e ${email}`, ) 
  //   })
  // }

  function excluiDados(id) {
    const query = "DELETE FROM `teste1` WHERE id = ?";
    const value = [id];
    conexao.query(query, value, (err, results) => {
        if (err) throw err;
        console.log(`Foram excluídos os dados com ID ${id}. Linhas afetadas: ${results.affectedRows}`);
    });
}




// function excluirDados(dadosExcluir) {
//   const query = 'DELETE FROM cs10 WHERE id IN (?)';
//   const values = [dadosExcluir];

//   conexao.query(query, [values], (error, results) => {
//       if (error) throw error;
//       console.log(`Foram excluídos ${results.affectedRows} registros`);
//   });
// }

  
  
  module.exports ={
    buscaDados,
    enviaDados,
    excluiDados,
    buscaDadosEnviados
  }