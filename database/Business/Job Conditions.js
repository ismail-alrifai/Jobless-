const Sequelize = require('sequelize');

const sequelize = require('../db');

// ----------------------------------- //

const JobConditions = sequelize.define('job_conditions' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- // 

    country: {
        type: Sequelize.STRING,
        allowNull: true
    },

    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },

    nationality: {
        type: Sequelize.STRING,
        allowNull: true
    },

    languages: { // front list back string with ,
        type: Sequelize.STRING,
        allowNull: true
    },

    age: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    skills: { //frontend list backend string with ,
        type: Sequelize.STRING,
        allowNull: true,
    },

    education_level: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    specialization: {
        type: Sequelize.STRING,
        allowNull: true,
    },

    years_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
},{
    timestamps: false 
});

module.exports = JobConditions;