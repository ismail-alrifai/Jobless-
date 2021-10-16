const Sequelize = require('sequelize');

const FrJobOffer  = require('./Freelance Job Offer');
const Freelancer  = require('../Freelancer DB/Freelancer')
const sequelize = require('../db');
// ----------------------------------- //

const FreelancerJobOffer = sequelize.define('freelancer_job_offers',{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    // ----------------------------------- // 

    freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    freelance_job_offer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false 
});

FreelancerJobOffer.belongsTo(FrJobOffer, {foreignKey: 'freelance_job_offer_id' ,targetKey: 'id'});
FreelancerJobOffer.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id'});
FrJobOffer.hasMany(FreelancerJobOffer ,{foreignKey: 'freelance_job_offer_id'});
Freelancer.hasMany(FreelancerJobOffer ,{foreignKey: 'freelancer_id'});

module.exports = FreelancerJobOffer;