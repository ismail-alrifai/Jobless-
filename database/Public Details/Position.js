const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const Positions = sequelize.define('positions' ,{
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },

    // ----------------------------------- // 

    latitude: { // width line
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    longitude: { // long line
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    city: {
        type: Sequelize.STRING,
        allowNull: true
    }
} , { 
    timestamps: false
});

module.exports = Positions;