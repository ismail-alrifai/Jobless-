const db                    = require('../database/myDB');
const addJob                = require('../database/Methods/AddJob');
const addCompany            = require('../database/Methods/AddCompany');
const addLoginId            = require('../database/Methods/AddLoginID');
const getObject             = require('../Classes/getObject');
const notification          = require('./Contact/NotificationsController');

// ------------------------------------- //
// ------------------------------------- //
// ------------------------------------- //

exports.acceptJobOffer = async (req ,res) => {
    const body = req.body;

    const job_offer_id = body.id;

    const jobOfferAdmin = await db.JobOfferAdminAccepter.findOne({
        where: {
            id: job_offer_id
        }
    });

    await addJob.addJojOffer(jobOfferAdmin.company_id ,jobOfferAdmin.date_of_publication ,jobOfferAdmin.title ,
                             jobOfferAdmin.description ,jobOfferAdmin.image ,jobOfferAdmin.salary ,
                             jobOfferAdmin.duration_of_job ,jobOfferAdmin.shift_time_of_job ,
                             jobOfferAdmin.number_of_vacancies ,jobOfferAdmin.job_condition_id);

    await jobOfferAdmin.destroy();

    const message = {
        notification: {
            title: "New Job Offer!!",
            body: "Jobless? There is new job offer in the app, Check it 😃"
        }
    };

    const allUser = await db.User.findAll();

    for(let i in allUser) {
        if( allUser[i].registration_token != null ) await notification.sendNotification(allUser[i].registration_token, message);

        await db.Notification.create({
            title: message.notification.title,
            body: message.notification.body,
            date_of_send: new Date(),
            is_read: false,
            user_id: allUser[i].id
        });
    }

    return res.sendStatus(201);
}

// ============================================ //
// ============================================ //
// ============================================ //

exports.rejectJobOffer = async (req ,res) => {
    const body = req.body;

    const job_offer_id = body.id;

    const jobOfferAdmin = await db.JobOfferAdminAccepter.findOne({
        where: {
            id: job_offer_id
        },
    });

    const jobCondition = await db.JobConditions.findOne({
        where: {
            id: jobOfferAdmin.job_condition_id
        },
    });

    const company = await db.Company.findOne({
        where:{
            id: jobOfferAdmin.company_id
        }
    });

    await jobCondition.destroy();

    await jobOfferAdmin.destroy();

    
    const message = {
        notification: {
            title: "Rejected Job Offer!!",
            body: "Your job offer has been rejected by the admin."
        }
    };
    
    if( company.registration_token != null )  await notification.sendNotification(company.registration_token, message);
    
    await db.Notification.create({
        title: message.notification.title,
        body: message.notification.body,
        date_of_send: new Date(),
        is_read: false,
        company_id: company.id
    });

    return res.sendStatus(200);
}

// ============================================ //
// ============================================ //
// ============================================ //

exports.acceptSignupCompany = async (req, res) => {
    const body = req.body;

    const {id} = body;

    const signupCompany = await db.CompanySignupAdminAccepter.findOne({
        where:{
            id: id
        }
    });

    /// --- Add new Company --- ///
    const company = await addCompany.Add(new Date(), signupCompany.password, signupCompany.email, signupCompany.name);

    /// -- Delete Company From CompanySAA --- ///
    await signupCompany.destroy();

    /// --- Add new login id --- ///
    const loginId = await addLoginId.addCompanyLoginID(company.id);

    await db.Notification.create({
        title: "LoginId",
        body: "Your LoginId is " + loginId.id,
        date_of_send: new Date(),
        is_read: false,
        company_id: company.id
    });

    // --- send json contain token and user id and company itself --- ///
    res.sendStatus(201);
};

/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///


exports.rejectSignupCompany = async (req, res) => {
    const body = req.body;

    const {id} = body;

    const signupCompany = await db.CompanySignupAdminAccepter.findOne({
        where:{
            id: id
        }
    });

    await signupCompany.destroy();

    return res.sendStatus(200);
};

/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///

exports.getListOfJobOffersBAA = async (req ,res) => {
    const jobOffers = await db.JobOfferAdminAccepter.findAll();

    let response = [];
    for(let i in jobOffers){
        const jobOffer = await getObject.getJobOfferBAAObject(jobOffers[i].id);
        response.push(jobOffer);
    }

    return res.status(302).json(response);
}

/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///

exports.getListOfReqCompanySignup = async (req ,res) => {
    const company = await db.CompanySignupAdminAccepter.findAll({});

    let response = [];
    for(let i in company){
        response.push({
            id: company[i].id,
            name: company[i].name,
            email: company[i].email
        });
    }

    return res.status(302).json(response);
}

/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///
/// ----------------------------------------------------- ///

exports.getAdmin = async (req ,res) => {
    const id = req.body.id;

    const admin = await getObject.getAdminObject(id);

    return res.status(302).json(admin);
}
