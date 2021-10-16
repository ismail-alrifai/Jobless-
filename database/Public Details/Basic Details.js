const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const BasicDetails = sequelize.define('basic_details' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------- //

    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {  
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    birthday_date: {
        type: Sequelize.DATE,
        allowNull: true
    },

    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },

    phone_number: {
        type: Sequelize.STRING,
        allowNull: true
    }
} , { 
    timestamps: false
});

module.exports = BasicDetails;