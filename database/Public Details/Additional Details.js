const Sequelize = require('sequelize');

const Accounts  = require('./Accounts');
const Positions = require('./Position');
const sequelize = require('../db');

// ----------------------------------- //

const AdditionalDetails = sequelize.define('additional_details' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------------------- // 

    image: {
        type: Sequelize.TEXT('long'),
        allowNull: true
    },

    credit_card_number: {
        type: Sequelize.STRING,
        allowNull: true
    },

    nationality: {
        type: Sequelize.STRING,
        allowNull: true
    },

    // ----------------------------------- // 

    account_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    position_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
} , {
     timestamps: false 
});

AdditionalDetails.belongsTo(Positions, {foreignKey: 'position_id' ,targetKey: 'id' });
AdditionalDetails.belongsTo(Accounts, {foreignKey: 'account_id' ,targetKey: 'id' });
Positions.hasOne(AdditionalDetails ,{foreignKey: 'position_id'});
Accounts.hasOne(AdditionalDetails ,{foreignKey: 'account_id'});

module.exports = AdditionalDetails;