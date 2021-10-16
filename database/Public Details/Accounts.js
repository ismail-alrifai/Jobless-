const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const Accounts = sequelize.define('accounts' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- // 

    twitter: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    instagram: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    gmail: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    facebook: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    telegram: {
        type: Sequelize.STRING,
        allowNull: true,
    }
} , {
     timestamps: false 
});

module.exports = Accounts;