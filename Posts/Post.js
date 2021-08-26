const sequelize = require('sequelize');
const database = require('../database/database');
const Category = require('../categorias/Category');

const Post = database.define('posts', {
    title: {
        type: sequelize.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize.STRING,
        allowNull: false,
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false,
    }
});

Post.belongsTo(Category);

Post.sync({force: false});

module.exports = Post;