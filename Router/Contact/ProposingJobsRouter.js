const schedule      = require('node-schedule');
const express       = require('express');
const Controller    = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

schedule.scheduleJob('0 15 11 * * *' ,Controller.ProposingJobsController.sendNotificationByGmail);

// --------------------------------------------------- //

module.exports = router;