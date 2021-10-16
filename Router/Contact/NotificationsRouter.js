const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/get_all_notifications' ,Controller.NotificationsController.getNotifications);

router.post('/change_read' ,Controller.NotificationsController.changeRead);

// --------------------------------------------------- //

module.exports = router;