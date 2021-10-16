const express = require('express');

const Controller = require('../Controllers/Controller');

const router = express.Router();

// --------------------------------------------------- //

router.post('/signup/company' ,Controller.SignUpAuthController.postSignupCompanyAdminAccepter);

router.post('/signup/freelancer' ,Controller.SignUpAuthController.postSignupFreelancer);

router.post('/signup/admin' ,Controller.SignUpAuthController.postSignupAdmin);

router.post('/signup/user' ,Controller.SignUpAuthController.postSignupUser);


router.post('/login/byloginid' ,Controller.LogInAuthController.postLoginByLoginId);

router.post('/login/byemail' ,Controller.LogInAuthController.postLoginByEmail);


// --------------------------------------------------- //

module.exports = router;