const Sequelize = require('sequelize');

const Company       = require('../Company DB/Company');
const JobConditions = require('./Job Conditions');
const sequelize     = require('../db');

// ----------------------------------- //

const JobOfferAdminAccepter = sequelize.define('job_offer_admin_accepters' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

     // ----------------------------------- // 

    date_of_publication: {
        type: Sequelize.DATE,
        allowNull: false
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    image: {
        type: Sequelize.TEXT('long'),
        allowNull: true
    },

    salary: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    duration_of_job: { // hour ex: 8.5 h
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    shift_time_of_job: {
        type: Sequelize.STRING,
        allowNull: true
    },

    number_of_vacancies: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 1
    },

     // ----------------------------------- // 

    job_condition_id: {
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

JobOfferAdminAccepter.belongsTo(JobConditions, {foreignKey: 'job_condition_id' ,targetKey: 'id'});
JobOfferAdminAccepter.belongsTo(Company, {foreignKey: 'company_id' ,targetKey: 'id'});
JobConditions.hasOne(JobOfferAdminAccepter ,{foreignKey: 'job_condition_id'});
Company.hasMany(JobOfferAdminAccepter ,{foreignKey: 'company_id'});

module.exports = JobOfferAdminAccepter;