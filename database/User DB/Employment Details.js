const Sequelize = require('sequelize');

const User      = require('./User');
const sequelize = require('../db');

// ----------------------------------- //

const EmploymentDetails = sequelize.define('employment_details' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------- //

    date_of_start: {
        type: Sequelize.DATE,
        allowNull: true
    },

    date_of_end: {
        type: Sequelize.DATE,
        allowNull: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    city: {
        type: Sequelize.STRING,
        allowNull: true
    },

    country: {
        type: Sequelize.STRING,
        allowNull: true
    },

    details: {
        type: Sequelize.STRING,
        allowNull: true
    },

    // ----------------------- //

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
} , {
     timestamps: false 
});

EmploymentDetails.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
User.hasMany(EmploymentDetails ,{foreignKey: 'user_id'});

module.exports = EmploymentDetails;