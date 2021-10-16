const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const Admin = sequelize.define('admins' ,{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    // ----------------------------------- // 

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

    date_of_account_creation: {
        type: Sequelize.DATE,
        allowNull: false
    },

    registration_token:{
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
},{
    timestamps: false 
});

module.exports = Admin;