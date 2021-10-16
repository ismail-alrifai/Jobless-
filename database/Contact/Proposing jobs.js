const Sequelize = require('sequelize');

const sequelize  = require('../db');

// ----------------------------------- //

const ProposingJobs = sequelize.define('proposing_jobs' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- //

    user_id:{
        type: Sequelize.INTEGER,
        allowNull: true
    },

    job_offer_id:{
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    timestamps: false
});

module.exports = ProposingJobs;