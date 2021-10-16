const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const EducationaDetails = sequelize.define('educational_details' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ------------------------------- //

    education: {
        type: Sequelize.STRING,
        allowNull: true
    },

    specialization: {
        type: Sequelize.STRING,
        allowNull: true
    },

    languages_known: {
        type: Sequelize.STRING,
        allowNull: true
    },

    graduate: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    courses: {
        type: Sequelize.STRING,
        allowNull: true
    },

    skills: {
        type: Sequelize.STRING,
        allowNull: true
    },

    c_v: {
        type: Sequelize.TEXT('long'),
        allowNull: true  
    }
} , { 
    timestamps: false
});

module.exports = EducationaDetails;