const Sequelize = require('sequelize');

const Accounts  = require('../Public Details/Accounts');
const Positions = require('../Public Details/Position');
const sequelize = require('../db');

// ----------------------------------- //

const Company = sequelize.define('companies' ,{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------- //

    date_of_account_creation: {
        type: Sequelize.DATE,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        uniqe:true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    image: {
        type: Sequelize.TEXT('long'),
        allowNull: true
    },

    specialization: {
        type: Sequelize.STRING,
        allowNull: true
    },

    description: {
        type: Sequelize.STRING,
        allowNull: true
    },

    // ----------------------- //

    account_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    position_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    registration_token:{
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
} , { 
    timestamps: false 
});

Company.belongsTo(Positions, {foreignKey: 'position_id' ,targetKey: 'id'});
Company.belongsTo(Accounts, {foreignKey: 'account_id' ,targetKey: 'id'});
Positions.hasOne(Company ,{foreignKey: 'position_id'});
Accounts.hasOne(Company ,{foreignKey: 'account_id'});

module.exports = Company;