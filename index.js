const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const database   = require('./database/database');
const session = require('express-session');

//CONEXÃO COM O BANCO DE DADOS
database.authenticate()
    .then(() => {
        console.log("Conexao feita com sucesso!");
    }).catch(erro => {
        console.log(erro);
    })
    
//ROTAS
const adminControllers = require('./administrador/adminControllers');
const categoriesControllers = require('./categorias/categoriesControllers');
const postsControllers      = require('./Posts/postsControllers');
const booksControllers      = require('./livros/booksControllers');

//MODELS 
const Admin = require('./administrador/Admin');
const Category = require('./categorias/Category');
const Post = require('./Posts/Post');
const Book = require('./livros/Book');

//CONFIGURAÇÕES DO AMBIENTE DE DESENVOLVIMENTO
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//SESSÕES
app.use(session({
    secret:"qualquercoisa",
    cookie: {maxAge: 10800000}
}))

app.use('/', adminControllers);
app.use('/', categoriesControllers);
app.use('/', postsControllers);
app.use('/', booksControllers);


app.get('/' , (req , res)=>{
    res.render('users/index');
});

const port = process.env.PORT || 8080;

app.listen(port, (erro) => {
    if (erro)
    {
        console.log("Erro!");
    }
    else
    {
        console.log("Sucesso!");
    }
});