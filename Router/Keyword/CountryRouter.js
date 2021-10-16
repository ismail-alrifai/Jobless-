const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.get('/keywords/get_all_countries' ,Controller.CountryController.getAllCountries);

// --------------------------------------------------- //

module.exports = router;