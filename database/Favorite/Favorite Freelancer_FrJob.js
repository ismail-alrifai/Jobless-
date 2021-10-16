const Sequelize = require('sequelize');

const FreelanceJobOffer = require('../Business/Freelance Job Offer');
const Freelancer        = require('../Freelancer DB/Freelancer');
const sequelize         = require('../db');

// ----------------------------------- //

const FavoriteFreelancerFrJob = sequelize.define('favorite_freelancer_frjobs' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- //

    freelance_job_offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
} , {
     timestamps: false 
});

FavoriteFreelancerFrJob.belongsTo(FreelanceJobOffer, {foreignKey: 'freelance_job_offer_id' ,targetKey: 'id'});
FavoriteFreelancerFrJob.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id'});
FreelanceJobOffer.hasMany(FavoriteFreelancerFrJob ,{foreignKey: 'freelance_job_offer_id'});
Freelancer.hasMany(FavoriteFreelancerFrJob ,{foreignKey: 'freelance_job_offer_id'});

module.exports = FavoriteFreelancerFrJob;