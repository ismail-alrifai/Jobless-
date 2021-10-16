const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const Countries = sequelize.define('countries' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- //

    country: {
        type: Sequelize.STRING,
        allowNull: true,
    },

} , {
    timestamps: false
});

module.exports = Countries;