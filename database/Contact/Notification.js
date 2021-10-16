const Sequelize = require('sequelize');

const Freelancer = require('../Freelancer DB/Freelancer');
const Company    = require('../Company DB/Company');
const Admin      = require('../Admin DB/Admin');
const User       = require('../User DB/User');
const sequelize  = require('../db');

// ----------------------------------- //

const Notification = sequelize.define('notifications' ,{
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
          default: 'Notification'
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
          type:Sequelize.BOOLEAN,
          allowNull: true,
          default: false
     },

     // ----------------------------------- //

     user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
     },

     admin_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
     },

     freelancer_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
     },

     company_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null
     }
} , { 
     timestamps: false
});

Notification.belongsTo(Freelancer, {foreignKey: 'freelancer_id' ,targetKey: 'id'});
Notification.belongsTo(Company, {foreignKey: 'company_id' ,targetKey: 'id'});
Notification.belongsTo(User, {foreignKey: 'user_id' ,targetKey: 'id'});
Notification.belongsTo(Admin, {foreignKey: 'admin_id' ,targetKey: 'id'});
Freelancer.hasMany(Notification ,{foreignKey: 'freelancer_id'});
Company.hasMany(Notification ,{foreignKey: 'company_id'});
User.hasMany(Notification ,{foreignKey: 'user_id'});
Admin.hasMany(Notification ,{foreignKey: 'admin_id'});

module.exports = Notification;