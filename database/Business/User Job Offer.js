const Sequelize = require('sequelize');

const User      = require('../User DB/User');
const JobOffer  = require('./Job Offer');
const sequelize = require('../db');

// ----------------------------------- //

const UserJobOffer = sequelize.define('user_job_offers',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    // ----------------------------------- // 

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    job_offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false 
});

UserJobOffer.belongsTo(JobOffer, {foreignKey: 'job_offer_id' ,targetKey: 'id'});
UserJobOffer.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
JobOffer.hasMany(UserJobOffer ,{foreignKey: 'job_offer_id'});
User.hasMany(UserJobOffer ,{foreignKey: 'user_id'});

module.exports = UserJobOffer;