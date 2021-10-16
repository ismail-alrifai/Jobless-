const Sequelize = require('sequelize');

const Freelancer = require('./Freelancer');
const sequelize  = require('../db');

// ----------------------------------- //

const PreviousWorks = sequelize.define('previous_works' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------- //

    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    // ----------------------- //

    freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
} , { 
    timestamps: false
});

PreviousWorks.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id' });
Freelancer.hasMany(PreviousWorks ,{foreignKey: 'freelancer_id'});

module.exports = PreviousWorks;