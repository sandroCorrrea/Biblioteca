const express = require('express');
const router   = express.Router();
const Admin = require('./Admin');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const adminAuth = require('../middleware/authAdmin');

router.get('/admin/index', adminAuth, (req, res) => {
    res.render('administrador/index')
});

router.get('/admin/new', adminAuth, (req, res) => {
    res.render('administrador/crudAdmin/new')
});

router.post('/admin/save', adminAuth, (req, res) => {
    var name = req.body.name;
    var cpf  = req.body.cpf;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    Admin.findOne({
        where: {email: email}
    }).then(email => {
        if (email == undefined)
        {
            if (password == confirmPassword)
            {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                Admin.create({
                    name: name,
                    cpf: cpf,
                    email: email,
                    password: hash,
                    slug: slugify(name),
                }).then(() => {
                    res.redirect('/admin/show')
                }).catch(erro => {
                    console.log("Erro ao salvar dados");
                })
            }else
            {
                res.redirect('/admin/new');
            }
        }
        else
        {
            res.render("events/repeatEmail");
        }
    });
});

router.get('/admin/show', adminAuth, (req, res) => {
    Admin.findAll({
        order: [['id', 'DESC']]
    }).then(admins => {
        res.render('administrador/crudAdmin/show', {
            admins: admins,
        })
    })
});

router.post('/admin/delete', adminAuth, (req, res) => {
    var id = req.body.id;

    if (isNaN(id))
    {
        res.redirect('/admin/show');
    }

    Admin.destroy({
        where: {id: id}
    }).then(admins => {
        if (admins != undefined)
        {
            res.redirect('/admin/show');
        }
        else
        {
            res.redirect('/admin/show');
        }
    }).catch(erro => {
        res.redirect('/admin/show');
    });
});

router.get('/admin/edit/:id',adminAuth, (req, res) => {
    var id = req.params.id;

    Admin.findByPk(id).then(admins => {
        if (admins != undefined)
        {
            if (!isNaN(id))
            {   
                res.render('administrador/crudAdmin/edit', {
                    admins: admins,
                })
            }
            else
            {
                res.redirect('/admin/show');
            }
        }
        else
        {
            res.redirect('/admin/show');
        }
    }).catch(erro => {
        res.redirect('/admin/show');
    })
})

router.post('/admin/update',adminAuth, (req, res) => {
    var name = req.body.name;
    var cpf  = req.body.cpf;
    var email = req.body.email;
    var password = req.body.password;
    var id = req.body.id;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    Admin.update({name: name, slug: slugify(name), cpf: cpf, email: email, password: hash}, {
        where: {id: id}
    }).then(() => {
        res.redirect('/admin/show');
    }).catch(erro => {
        res.redirect('/admin/show');
    });
});

router.get('/login' , (req , res)=>{
    res.render('users/login');
})

router.post('/login/save' , (req , res)=>{
    var email = req.body.email;
    var password = req.body.password;

    Admin.findOne({
        where: {email: email}
    }).then(admins => {
        if (admins != undefined)
        {
            var compare = bcrypt.compareSync(password, admins.password);
            if (compare)
            {
                req.session.admins = {
                    id:  admins.id,
                    email: admins.email,
                }
                res.redirect('/admin/index');
            }
            else
            {
                res.render('events/userPassword');
            }
        }
        else
        {
            res.render('events/userEmail');
        }
    })
});

router.get('/register' , (req , res)=>{
    res.render('users/new');
});

router.post('/user/save', (req, res) => {
    var name = req.body.name;
    var cpf  = req.body.cpf;
    var email = req.body.email;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    Admin.findOne({
        where: {email: email}
    }).then(admin => {
        if (admin == undefined)
        {
            if (password == confirmPassword)
            {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
            
                Admin.create({
                    name: name,
                    slug: slugify(name),
                    cpf: cpf,
                    email: email,
                    password: hash,
                }).then(() => {
                    res.redirect('/admin/index');
                }).catch(erro => {
                    res.send("Erro ao salvar no banco");
                })    
            }
            else
            {
                res.render('events/userPassword');
            }
        }
        else
        {
            res.render('events/userEmail');
        }
    })
});

router.get('/logout', (req, res) => {
    req.session.admins = null;
    res.redirect('/');
});

module.exports = router;