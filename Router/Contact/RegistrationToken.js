const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/add_registration_token' ,Controller.RegistrationTokenController.addRegistrationToken);

router.post('/delete_registration_token' ,Controller.RegistrationTokenController.deleteRegistrationToken);

// --------------------------------------------------- //

module.exports = router;