const Sequelize = require('sequelize');

const Company   = require('../Company DB/Company');
const User      = require('../User DB/User');
const sequelize = require('../db');

// ----------------------------------- //

const JobArchive = sequelize.define('job_archives' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- // 

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    salary: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    duration_of_job: { 
        // hour ex: 8.5 h
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    shift_time_of_job: {
        type: Sequelize.STRING,
        allowNull: true
    },

    educational_level: {
        type: Sequelize.STRING,
        allowNull: true
    },

    specialization: {
        type: Sequelize.STRING,
        allowNull: true
    },

    skills: {
        type: Sequelize.STRING,
        allowNull: true
    },

    year_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    rate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    // ----------------------------------- // 

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false 
});

JobArchive.belongsTo(Company, {foreignKey: 'company_id' ,targetKey: 'id'});
JobArchive.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
Company.hasMany(JobArchive ,{foreignKey: 'company_id'});
User.hasMany(JobArchive ,{foreignKey: 'user_id'});

module.exports = JobArchive;