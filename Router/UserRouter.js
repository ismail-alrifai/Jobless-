const express = require('express');

const Controller = require('../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/edit/user/basicdetails' ,Controller.UserController.editBasicDetails);

router.post('/edit/user/educationaldetails' ,Controller.UserController.editEducationalDetails);

router.post('/edit/user/additionaldetails' ,Controller.UserController.editAdditionalDetails);

router.post('/add/user/employmentdetails' ,Controller.UserController.addEmplotmentDetail);

router.post('/delete/user/employmentdetails' ,Controller.UserController.deleteEmplotmentDetail);

router.post('/get/user_employment_details'  ,Controller.UserController.getUserEmploymentDetails);


router.post('/user/add/frjob' ,Controller.UserController.addFrJob);

router.post('/user/edit/frjob' ,Controller.UserController.editFrJob);

router.post('/user/delete/frjob' ,Controller.UserController.deleteFrJob );

router.post('/user/accept/freelancer' ,Controller.UserController.acceptFreelancer);

router.post('/user/reject/freelancer' ,Controller.UserController.rejectFreelancer);


router.post('/user/apply_for_a_job' ,Controller.UserController.applyForAJob);

router.post('/user/get_applied_job' ,Controller.UserController.getListOfAppliedJob);

router.post('/delete/user/user_job_offer' ,Controller.UserController.deleteUserJobOffer);

router.post('/user/all_job_offers' ,Controller.UserController.getListOfJobOffers);

router.post('/user/get_all_its_frjob_offers' ,Controller.UserController.getListOfItsFrJobOffers);

router.post('/user/ratefreelancer' ,Controller.UserController.rateFreelancer);

router.post('/user/ratecompany' ,Controller.UserController.rateCompany);


router.post('/user/change_job_favorite' ,Controller.UserController.jobFavoriteChanger);


router.post('/user/delete_account' ,Controller.UserController.deleteAccount);

router.post('/user/get_all_income_request',Controller.UserController.getListOfInComeReqForFrJobOffer);

router.post('/user/favorite_job_offer',Controller.UserController.getListOfFavoriteJobOffer);

router.post('/user/get_all_freelancer' ,Controller.UserController.getListOfFreelancer);

router.post('/get/user'  ,Controller.UserController.getUser);


// --------------------------------------------------- //

module.exports = router;