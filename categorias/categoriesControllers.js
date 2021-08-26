const express = require('express');
const router  = express.Router();
const Category = require('./Category');
const slugify = require('slugify');
const authAdmin = require('../middleware/authAdmin');

router.get('/admin/categories/new', authAdmin, (req, res) => {
    res.render('administrador/categories/new');
});

router.post('/admin/categories/save',authAdmin, (req, res) => {
    var title = req.body.title;
    Category.create({
        title: title,
        slug: slugify(title),
    }).then(() => {
        res.redirect('/admin/categories/show');
    }).catch(erro => {
        res.redirect('/admin/categories/new');
    })
});

router.get('/admin/categories/show',authAdmin, (req, res) => {
    Category.findAll({
        order: [['id', 'DESC']]
    }).then(categories => {
        res.render('administrador/categories/show', {
            categories: categories,
        });
    })
});

router.post('/admin/categories/delete',authAdmin, (req, res) => {
    var id = req.body.id;

    if (isNaN(id))
    {
        res.redirect('/admin/categories/show');
    }

    Category.destroy({
        where: {id: id}
    }).then(categories => {
        if (categories != undefined)
        {
            res.redirect('/admin/categories/show');
        }
        else
        {
            res.redirect('/admin/categories/show');
        }
    }).catch(erro => {
        res.redirect('/admin/categories/show');
    });
});

router.get('/admin/categories/edit/:id',authAdmin, (req, res) => {
    var id = req.params.id;

    Category.findByPk(id).then(categories => {
        if (categories != undefined)
        {
            if (!isNaN(id))
            {
                res.render('administrador/categories/edit', {
                    categories: categories,
                });
            }
            else
            {
                res.redirect('/admin/categories/show');
            }
        }
        else
        {
            res.redirect('/admin/categories/show');
        }
    }).catch(erro => {
        res.redirect('/admin/categories/show');
    });
});

router.post('/admin/categories/update', authAdmin,(req, res) => {
    var title = req.body.title;
    var id    = req.body.id;

    Category.update({title: title, slug: slugify(title)}, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/categories/show');
    }).catch(erro => {
        res.redirect('/admin/categories/show');
    });
});

module.exports = router;