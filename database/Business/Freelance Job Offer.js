const Sequelize = require('sequelize');

const User      = require('../User DB/User');
const sequelize = require('../db');

// ----------------------------------- //

const FreelanceJobOffer = sequelize.define('freelance_job_offers' ,{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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

    wage: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },

    deadline: {
        type: Sequelize.DATE,
        allowNull: true,
    },

    skills: {
        //frontend list backend string with ,
        type: Sequelize.STRING,
        allowNull: true,
    },

    // ----------------------------------- // 

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false 
});

FreelanceJobOffer.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
User.hasMany(FreelanceJobOffer ,{foreignKey: 'user_id'});

module.exports = FreelanceJobOffer;