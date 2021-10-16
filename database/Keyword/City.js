const Sequelize = require('sequelize');

const sequelize = require('../db');
const Countries = require('./Country');

// ----------------------------------- //

const Cities = sequelize.define('cities' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    latitude: { // width line
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    longitude: { // long line
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    // ----------------------------------- //

    country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

} , {
    timestamps: false
});


Cities.belongsTo(Countries, {foreignKey: 'country_id' ,targetKey: 'id' });
Countries.hasMany(Cities ,{foreignKey: 'country_id'});

module.exports = Countries;