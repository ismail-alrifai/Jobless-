const Sequelize = require('sequelize');

const Freelancer = require('../Freelancer DB/Freelancer');
const User       = require('../User DB/User');
const sequelize  = require('../db');

// ----------------------------------- //

const FreelancerJobArchive = sequelize.define('freelancer_job_archives' ,{
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

    wage: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    deadline: {
        type: Sequelize.DATE,
        allowNull: true,
    },

    rate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
    },

    // ----------------------------------- // 

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    timestamps: false 
});

FreelancerJobArchive.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id'});
FreelancerJobArchive.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
Freelancer.hasMany(FreelancerJobArchive ,{foreignKey: 'freelancer_id'});
User.hasMany(FreelancerJobArchive ,{foreignKey: 'user_id'});

module.exports = FreelancerJobArchive;