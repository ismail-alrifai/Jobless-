const express = require('express');

const router = express.Router();

const Controller = require('../Controllers/Controller');

// --------------------------------------------------- //

router.post('/edit/company' ,Controller.CompanyController.editProfile);

router.post('/company/add/job' ,Controller.CompanyController.sendJopToAdmin);

router.post('/company/edit/job',Controller.CompanyController.editJob);

router.post('/company/delete/job_before_admin_accept',Controller.CompanyController.deleteJobBeforeAdminAccept);

router.post('/company/delete/job_after_admin_accept',Controller.CompanyController.deleteJobAfterAdminAccept);


router.post('/company/get_all_its_job_offers',Controller.CompanyController.getListOfItsJobOffers);

router.post('/company/get_all_baa_its_job_offers',Controller.CompanyController.getListOfItsJobOffersBAA);

router.post('/company/get_all_income_request',Controller.CompanyController.getListOfInComeReqForJobOffer);

router.post('/company/accept_user',Controller.CompanyController.acceptUser);

router.post('/company/reject_user',Controller.CompanyController.rejectUser);

router.post('/company/delete_account',Controller.CompanyController.deleteAccount);


router.post('/get/company'  ,Controller.CompanyController.getCompany);

// --------------------------------------------------- //

module.exports = router;