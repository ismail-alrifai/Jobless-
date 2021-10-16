const Sequelize = require('sequelize');

const Freelancer = require('../Freelancer DB/Freelancer');
const Company    = require('../Company DB/Company');
const User       = require('../User DB/User');
const sequelize  = require('../db');

// ----------------------------------- //

const Message = sequelize.define('messages' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

     // ----------------------------------- //
    
    title: {
        type: Sequelize.STRING,
        allowNull: true,
        default: 'Message'
    },

    body: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    date_of_send: {
        type: Sequelize.DATE,
        allowNull: false 
    },
    
    is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
    },

    // ----------------------------------- //

    from_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    from_freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    from_company_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    to_user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    to_freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    to_company_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{
    timestamps: false 
});

Message.belongsTo(Freelancer, {foreignKey: 'from_freelancer_id' ,targetKey: 'id'});
Message.belongsTo(Freelancer, {foreignKey: 'to_freelancer_id' ,targetKey: 'id'});
Message.belongsTo(Company, {foreignKey: 'from_company_id' ,targetKey: 'id'});
Message.belongsTo(Company, {foreignKey: 'to_company_id' ,targetKey: 'id'});
Message.belongsTo(User, {foreignKey: 'from_user_id' ,targetKey: 'id'});
Message.belongsTo(User, {foreignKey: 'to_user_id' ,targetKey: 'id'});
Freelancer.hasMany(Message ,{foreignKey: 'from_freelancer_id'});
Freelancer.hasMany(Message ,{foreignKey: 'to_freelancer_id'});
Company.hasMany(Message ,{foreignKey: 'from_company_id'});
Company.hasMany(Message ,{foreignKey: 'to_company_id'});
User.hasMany(Message ,{foreignKey: 'from_user_id'});
User.hasMany(Message ,{foreignKey: 'to_user_id'});

module.exports = Message;