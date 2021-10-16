const Sequelize = require('sequelize');

const Freelancer = require('../Freelancer DB/Freelancer');
const Company    = require('../Company DB/Company');
const Admin      = require('../Admin DB/Admin');
const User       = require('../User DB/User');
const sequelize  = require('../db');

// ----------------------------------- //

const LoginId = sequelize.define('login_ids' ,{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    // ----------------------- //

    freelancer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    company_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    admin_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
},{ 
    timestamps: false,

    // start the (login id)s from 10000
    initialAutoIncrement: 10000
});

LoginId.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id' });
LoginId.belongsTo(Company, {foreignKey: 'company_id' ,targetKey: 'id' });
LoginId.belongsTo(Admin, {foreignKey: 'admin_id' ,targetKey: 'id' });
LoginId.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id' });
Freelancer.hasOne(LoginId ,{foreignKey: 'freelancer_id'});
Company.hasOne(LoginId ,{foreignKey: 'company_id'});
Admin.hasOne(LoginId ,{foreignKey: 'admin_id'});
User.hasOne(LoginId ,{foreignKey: 'user_id'});

module.exports = LoginId;