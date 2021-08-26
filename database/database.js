const { Sequelize } = require('sequelize');


//CONEXAO COM UM BANCO EXTERNO
const database = new Sequelize('heroku_5efa85e8660fbf3', 'b0ff0dcb09dc6a', '2c21d948', {
    host: 'us-cdbr-east-04.cleardb.com',
    dialect: 'mysql',
    timezone: '-03:00',
})


//CONEXAO COM UM BANCO LOCAL
// const database = new Sequelize('biblioteca', 'root', 'scrj123456', {
//     host: 'localhost',
//     dialect: 'mysql',
//     timezone: '-03:00',
// })


//CONEXÃO COM UM BANCO EXTERNO
//mysql://b0ff0dcb09dc6a:2c21d948@us-cdbr-east-04.cleardb.com/heroku_5efa85e8660fbf3?reconnect=true
//NOME DO USUARIO: b0ff0dcb09dc6a
//SENHA: 2c21d948
//HOST: us-cdbr-east-04.cleardb.com
//NOME DO BANCO: heroku_5efa85e8660fbf3
module.exports = database;