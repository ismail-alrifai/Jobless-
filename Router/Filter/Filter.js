const express = require('express');

const Controller = require('../../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/filter/frjoboffer' ,Controller.ListGetterController.getFrJobOfferList ,Controller.FilterController.FrJobOfferFilter);

router.post('/filter/joboffer' ,Controller.ListGetterController.getJobOfferList ,Controller.FilterController.JobOfferFilter);

router.post('/filter/company/in_req_joboffer' ,Controller.ListGetterController.getIncomeJobOfferList ,Controller.FilterController.IncommingRequestesForJobOfferFilter);

router.post('/filter/user/in_req_frjoboffer' ,Controller.ListGetterController.getIncomeFrJobOfferList,Controller.FilterController.IncommingRequestesForFrJobOfferFilter);

// --------------------------------------------------- //

module.exports = router;