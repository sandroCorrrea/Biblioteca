const express = require('express');
const router = express.Router();
const Category = require('../categorias/Category');
const Post = require('./Post');
const slugify = require('slugify');
const adminAuth = require('../middleware/authAdmin');

router.get('/admin/post/new',adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render("administrador/posts/new", {
            categories: categories,
        });
    });
});

router.post('/admin/post/save',adminAuth, (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.categoryId;

    Post.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId,
    }).then(() => {
        res.redirect('/admin/post/show');
    }).catch(erro => {
        res.send('Erro');
    })
});

router.get('/admin/post/show',adminAuth, (req, res) => {
    Post.findAll({
        include: [{model: Category}]
    }).then(posts => {
        res.render('administrador/posts/show', {
            posts: posts,
        })
    })
});

router.post('/admin/post/delete',adminAuth, (req, res) => {
    var id = req.body.id;

    if (isNaN(id))
    {
        res.redirect('/admin/post/show');
    }

    Post.destroy({
        where: {id: id}
    }).then(posts => {
        if (posts != undefined)
        {
            res.redirect('/admin/post/show');
        }
        else
        {
            res.redirect('/admin/post/show');
        }
    }).catch(erro => {
        res.redirect('/admin/post/show');
    });
});

router.get('/admin/post/edit/:id',adminAuth, (req, res) => {
    var id = req.params.id;

    Post.findByPk(id).then(posts => {
        if (posts != undefined)
        {
            if (!isNaN(id))
            {
                Category.findAll().then(categories => {
                    res.render('administrador/posts/edit', {
                        posts: posts,
                        categories: categories,
                    })
                })
            }
            else
            {
                res.redirect('/admin/post/show');
            }
        }
        else
        {
            res.redirect('/admin/post/show');
        }
    }).catch(erro => {
        res.redirect('/admin/post/show');
    });
});

module.exports = router;