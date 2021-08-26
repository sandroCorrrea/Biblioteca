const sequelize = require('sequelize');
const database = require('../database/database');

const Admin = database.define('administradores', {
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    cpf: {
        type: sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false,
    }
})

// Admin.sync({force: false});

module.exports = Admin;