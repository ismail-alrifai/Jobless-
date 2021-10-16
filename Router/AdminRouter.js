const express = require('express');

const Controller = require('../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/admin/accept_company_signup' ,Controller.AdminController.acceptSignupCompany);

router.post('/admin/reject_company_signup' ,Controller.AdminController.rejectSignupCompany);

router.post('/admin/accept_job_offer' ,Controller.AdminController.acceptJobOffer);

router.post('/admin/reject_job_offer'  ,Controller.AdminController.rejectJobOffer);


router.post('/admin/all_job_offers' ,Controller.AdminController.getListOfJobOffersBAA);

router.post('/admin/all_company_request' ,Controller.AdminController.getListOfReqCompanySignup);

router.post('/get/admin' ,Controller.AdminController.getAdmin);

// --------------------------------------------------- //

module.exports = router;