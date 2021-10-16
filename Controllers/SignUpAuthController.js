const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltVal = 12; // hash password salt value

// ----------------------------------- //

const fromStringToDate  = require('./Methods/fromStringToDate');
const addBasicDetails   = require('../database/Methods/AddBasicDetails');
const emailsChecker     = require('./Methods/emailsChecker');
const addFreelancer     = require('../database/Methods/AddFreelancer');
const addCompanySAA     = require('../database/Methods/AddCompanySignupAdminAccepter')
const addLoginId        = require('../database/Methods/AddLoginID');
const getObject         = require('../Classes/getObject');
const addAdmin          = require('../database/Methods/AddAdmin');
const addUser           = require('../database/Methods/AddUser');
const config            = require('../jwt/config.json');
const db                = require('../database/myDB');

/// ==================================================================== ///
/// ==================================================================== ///
/// ==================================================================== ///

exports.postSignupCompanyAdminAccepter = async (req, res) => {
    const body = req.body;

    const {password ,email ,name} = body;

    const emailIsExist = await emailsChecker.Check(email);
   
    if( emailIsExist === true ) {
        // email is exist we can't add
        // redirect to sign up page with 400 state code (error)
        return res.sendStatus(400);
    }
    else {
        // email is not exist we can add
        bcrypt.hash(password, saltVal).then( async hashedPassword => {
            /// --- Add new Company Signup Admin Accepter --- ///
            await addCompanySAA.Add(name ,email ,hashedPassword );
            return res.sendStatus(201);
        });
    }
};

/// ==================================================================== ///
/// ==================================================================== ///
/// ==================================================================== ///

exports.postSignupUser = async (req, res) => {
    const body = req.body;
    const birthday  = fromStringToDate(body["birthday"]);
    const firstName = body["first_name"];
    const lastName  = body["last_name"];
    const password  = body["password"]; 
    const gender    = body["gender"];
    const email     = body["email"];

    const emailIsExist = await emailsChecker.Check(email);

    if( emailIsExist === true ) {
        // email is exist we can't add
        // redirect to sign up page with 400 state code (error)
        return res.sendStatus(400);
    }
    else {
        // email is not exist we can add

        bcrypt.hash(password, saltVal).then( async hashedPassword => {

            /// --- Add New Basic Details of user --- ///
            const basicDetails = await addBasicDetails.Add(birthday, hashedPassword, firstName, lastName, gender, email);

            /// --- Add new user --- ///
            const user = await addUser.Add(new Date(), basicDetails.id, null, null);

            /// --- Add new login id --- ///
            const loginId = await addLoginId.addUserLoginID(user.id);

            await db.Notification.create({
                title: "LoginId",
                body: "Your LoginId is " + loginId.id,
                date_of_send: new Date(),
                is_read: false,
                user_id: user.id
            });

            /// --- create token --- ///
            const token = await jwt.sign({ sub: email } ,config.secret ,{ expiresIn: '1d' });
            
            /// --- get full object --- ///
            const object = await getObject.getUserObject(user.id);

            // --- send json contain token and user id and user object itself --- /// 
            return res.status(201).json({token: token ,userId: loginId.id ,object: object ,type_of_account: 4});
        });
    }
};

/// ==================================================================== ///
/// ==================================================================== ///
/// ==================================================================== ///

exports.postSignupFreelancer = async (req, res) => {
    const body = req.body;
    
    const birthday  = fromStringToDate(body["birthday"]);
    const firstName = body["first_name"];
    const lastName  = body["last_name"];
    const password  = body["password"]; 
    const gender    = body["gender"];
    const email     = body["email"];

    const emailIsExist = await emailsChecker.Check(email);

    if( emailIsExist === true ) {
        // email is exist we can't add
        // redirect to sign up page with 400 state code (error)
        return res.sendStatus(400);
    }
    else {
        // email is not exist we can add
        bcrypt.hash(password, saltVal).then( async hashedPassword => {

            /// --- Add New Basic Details of freelancer --- ///
            const basicDetails = await addBasicDetails.Add(birthday, hashedPassword, firstName, lastName, gender, email);

            /// --- Add new freelancer --- ///
            const freelancer = await addFreelancer.Add(new Date(), basicDetails.id, null, null);

            /// --- Add new login id --- ///
            const loginId = await addLoginId.addFreelancerLoginID(freelancer.id);

            await db.Notification.create({
                title: "LoginId",
                body: "Your LoginId is " + loginId.id,
                date_of_send: new Date(),
                is_read: false,
                freelancer_id: freelancer.id
            });

            /// --- create token --- ///
            const token = await jwt.sign({ sub: email } ,config.secret ,{ expiresIn: '1d' });
            
            /// --- get full object --- ///
            const object = await getObject.getFreelancerObject(freelancer.id);

            // --- send json contain token and user id and freelancer object itself --- /// 
            return res.status(201).json({token: token ,userId: loginId.id ,object: object ,type_of_account: 1});
        });
    }
};

/// ==================================================================== ///
/// ==================================================================== ///
/// ==================================================================== ///

exports.postSignupAdmin = async (req, res) => {
    const body = req.body;
    const firstName = body["first_name"];
    const lastName  = body["last_name"];
    const password  = body["password"]; 
    const email     = body["email"];

    const emailIsExist = await emailsChecker.Check(email);

    if( emailIsExist === true ) {
        // email is exist we can't add
        // redirect to sign up page with 400 state code (error)
        return res.sendStatus(400);
    }
    else {
        // email is not exist we can add
        bcrypt.hash(password, saltVal).then( async hashedPassword => {
            /// --- Add new Admin --- ///
            const admin = await addAdmin.Add(firstName ,lastName ,email ,hashedPassword ,new Date());

            /// --- Add new login id --- ///
            const loginId = await addLoginId.addAdminLoginID(admin.id);
            
            await db.Notification.create({
                title: "LoginId",
                body: "Your LoginId is " + loginId.id,
                date_of_send: new Date(),
                is_read: false,
                admin_id: admin.id
            });

            // --- send json contain token and user id and freelancer object itself --- /// 
            return res.sendStatus(201);
        });
    }
};

/// ==================================================================== ///