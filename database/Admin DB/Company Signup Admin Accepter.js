const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const CompanySignupAdminAccepter = sequelize.define('company_signup_admin_accepters' ,{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    // ----------------------------------- //

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    timestamps: false
});

module.exports = CompanySignupAdminAccepter;