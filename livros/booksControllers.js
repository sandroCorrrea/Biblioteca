const express = require('express');
const router = express.Router();
const Category = require('../categorias/Category');
const slugify = require('slugify');
const Book = require('./Book');
const adminAuth = require('../middleware/authAdmin');

router.get('/admin/book/new', adminAuth,(req, res) => {
    Category.findAll().then(categories => {
        res.render('administrador/books/new', {
            categories: categories,
        });
    })
});

router.post('/admin/book/save', adminAuth,(req, res) => {
    var name = req.body.name;
    var numberPages = req.body.numberPages;
    var author = req.body.author;
    var summary = req.body.summary;
    var categoryId = req.body.categoryId;

    Book.create({
        name: name,
        slug: slugify(name),
        numberPages: numberPages,
        author: author,
        summary: summary,
        categoryId: categoryId,
    }).then(() => {
        res.redirect('/admin/book/show');
    }).catch(erro => {
        res.redirect('/admin/book/new');
    });
});

router.get('/admin/book/show', adminAuth,(req, res) => {
    Book.findAll({
        include: [{model: Category}]
    }).then(books => {
        res.render('administrador/books/show', {
            books: books,
        });
    }).catch(erro => {
        res.redirect('/admin/book/new');
    });
});

router.post('/admin/book/delete',adminAuth, (req, res) => {
    var id = req.body.id;

    if (isNaN(id))
    {
        res.redirect('/admin/book/show');
    }

    Book.destroy({
        where: {id: id}
    }).then(books => {
        if (books != undefined)
        {
            res.redirect('/admin/book/show');
        }
        else
        {
            res.redirect('/admin/book/show');
        }
    }).catch(erro => {
        res.redirect('/admin/book/show');
    });
});

router.get('/admin/book/edit/:id',adminAuth, (req, res) => {
    var id = req.params.id;

    Book.findByPk(id).then(books => {
        if (books != undefined)
        {
            if (!isNaN(id))
            {
                Category.findAll().then(categories => {
                    res.render('administrador/books/edit', {
                        books: books,
                        categories: categories
                    });
                });
            }
            else
            {
                res.redirect('/admin/book/show');
            }
        }
        else
        {
            res.redirect('/admin/book/show');
        }
    }).catch(erro => {
        res.redirect('/admin/book/show');
    });
});

router.post('/admin/book/update',adminAuth, (req, res) => {
    var name = req.body.name;
    var numberPages = req.body.numberPages;
    var author = req.body.author;
    var summary = req.body.summary;
    var categoryId = req.body.categoryId;
    var id = req.body.id;

    Book.update({name: name, slug: slugify(name), numberPages: numberPages, author: author, 
        summary: summary, categoryId: categoryId}, {
            where: {id: id}
        }).then(() => {
            res.redirect('/admin/book/show');
    }).catch(erro => {
        res.redirect('/admin/book/show');
    });
});

module.exports = router;