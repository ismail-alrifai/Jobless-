const express = require('express');

const Controller = require('../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/freelancer/add/portofolio',Controller.FreelancerController.addPortofolio);

router.post('/freelancer/delete/portofolio' ,Controller.FreelancerController.deletePortofolio);


router.post('/edit/freelancer/basicdetails' ,Controller.FreelancerController.editBasicDetails);

router.post('/edit/freelancer/educationaldetails',Controller.FreelancerController.editEducationalDetails);

router.post('/edit/freelancer/additionaldetails',Controller.FreelancerController.editAdditionalDetails);

router.post('/add/freelancer/previouswork' ,Controller.FreelancerController.addPreviousWorks);

router.post('/edit/freelancer/previouswork',Controller.FreelancerController.editPreviousWorks);

router.post('/delete/freelancer/previouswork' ,Controller.FreelancerController.deletePreviousWorks);

router.post('/get/freelancer_previous_works'  ,Controller.FreelancerController.getFreelancerPreviousWorks);


router.post('/freelancer/apply_for_a_frJob' ,Controller.FreelancerController.applyForAFrJob);

router.post('/freelancer/get_applied_frJob' ,Controller.FreelancerController.getListOfAppliedFrJob);

router.post('/delete/freelancer/freelancer_job_offer' ,Controller.FreelancerController.deleteFreelancerJobOffer);


router.post('/freelancer/change_fr_job_favorite' ,Controller.FreelancerController.frJobFavoriteChanger);

router.post('/freelancer/favorite_frjob_offer' ,Controller.FreelancerController.getListOfFavoriteFrJobOffer);


router.post('/freelancer/all_frJob_offers' ,Controller.FreelancerController.getListOfFrJobOffers);

router.post('/freelancer/delete_account' ,Controller.FreelancerController.deleteAccount);


router.post('/get/freelancer'  ,Controller.FreelancerController.getFreelancer);


// --------------------------------------------------- //

module.exports = router; 