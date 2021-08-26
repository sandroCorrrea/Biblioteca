const sequelize = require('sequelize');
const database = require('../database/database');
const Category = require('../categorias/Category');

const Book = database.define('books', {
    name: {
        type: sequelize.STRING,
        allowNull: false,
    },
    numberPages: {
        type: sequelize.INTEGER,
        allowNull: null,
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false,
    },
    summary: {
        type: sequelize.TEXT,
        allowNull: false,
    },
    author: {
        type: sequelize.STRING,
        allowNull: false,
    }
});

Book.belongsTo(Category);

Book.sync({force: false});

module.exports = Book;
