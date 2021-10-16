const Sequelize = require('sequelize');

// ----------------------------------- //

const db = new Sequelize('db' ,'root' ,'' ,{
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = db;