const Sequelize = require('sequelize');

const JobOffer  = require('../Business/Job Offer');
const User      = require('../User DB/User');
const sequelize = require('../db');

// ----------------------------------- //

const FavoriteUserJob = sequelize.define('favorite_user_jobs' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- //

    job_offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
} , {
     timestamps: false
});

FavoriteUserJob.belongsTo(JobOffer, {foreignKey: 'job_offer_id' ,targetKey: 'id'});
FavoriteUserJob.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
JobOffer.hasMany(FavoriteUserJob ,{foreignKey: 'job_offer_id'});
User.hasMany(FavoriteUserJob ,{foreignKey: 'user_id'});

module.exports = FavoriteUserJob;