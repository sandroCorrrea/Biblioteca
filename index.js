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

app.get('/posts' , (req , res)=>{
    Post.findAll().then(posts => {
        res.render('users/posts', {
            posts: posts,
        });
    })
});

app.get('/book' , (req , res)=>{
    Book.findAll(
        {
            include: [{model: Category}],
            order: [['id', 'DESC']]
        }
    ).then(books => {
        res.render('users/book', {
            books: books,
        });
    });
});

app.post('/user/drop' , (req , res)=>{
    var id = req.body.id;

    if (isNaN(id))
    {
        res.redirect('/book');
    }
    Book.destroy({
        where: {id: id}
    }).then(book => {
        if (book != undefined)
        {
            res.redirect('/book');
        }
        else
        {
            res.redirect('/book');
        }
    }).catch(erro => {
        res.redirect('/book');
    });
});

app.get('/book/search' , (req , res)=>{
   res.render('users/search');
})

app.post('/book/search/now' , (req , res)=>{
    var search = req.body.search;
    Book.findOne({
        include: [{model: Category}],
        where: {name: search}
    }).then(books => {
        if (books.name == search)
        {
            res.render('events/trueBook', {
                books: books,
            });
        }
    }).catch(erro => {
        res.render('events/falseBook');
    });
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