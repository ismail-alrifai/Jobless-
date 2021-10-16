const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/send_message' ,Controller.MessageController.sendMessage);

router.post('/change_read' ,Controller.MessageController.changeRead);

router.post('/new_message' ,Controller.MessageController.newMessage ,Controller.MessageController.sendMessage);

router.post('/get_all_messages' ,Controller.MessageController.getAllMessages);

// --------------------------------------------------- //

module.exports = router;