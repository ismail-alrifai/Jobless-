const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/user/search' ,Controller.SearchController.JobOfferSearch);

router.post('/freelancer/search' ,Controller.SearchController.FrJobOfferSearch);


// --------------------------------------------------- //

module.exports = router;