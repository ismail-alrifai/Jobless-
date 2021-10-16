const express = require('express');

const Controller = require('../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/guest/get_all_job' ,Controller.GuestController.getAllJob);

router.post('/guest/get_all_frjob' ,Controller.GuestController.getAllFrJob);

// --------------------------------------------------- //

module.exports = router;