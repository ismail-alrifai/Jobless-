const addEducationalDetails = require('../database/Methods/AddEducationalDetails');
const addAdditionalDetails  = require('../database/Methods/AddAdditionalDetails');
const addEmplotmentDetail   = require('../database/Methods/AddEmploymentDetail');
const fromStringToDate      = require('./Methods/fromStringToDate');
const addFreelanceJob       = require('../database/Methods/AddFreelanceJob');
const notification          = require('./Contact/NotificationsController');
const checkObject           = require('./Methods/checkObject');
const addPosition           = require('../database/Methods/AddPosition');
const addAccount            = require('../database/Methods/AddAccount');
const getObject             = require('../Classes/getObject');
const db                    = require('../database/myDB');


// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.editBasicDetails = async (req, res) => {
    const body = req.body;
    
    const birthdayDate      = fromStringToDate(body["birthday_date"]);
    const phoneNumber       = body["phone_number"];
    const firstName         = body["first_name"];
    const lastName          = body["last_name"];
    const gender            = body["gender"];
    const id                = body["id"];

    const user = await db.User.findOne({
        where:{
            id: id
        }
    });

    const basicDetail = await db.BasicDetails.findOne({
        where:{
            id: user.basic_details_id
        }
    });

    basicDetail.birthday_date   = birthdayDate;
    basicDetail.phone_number    = phoneNumber;
    basicDetail.first_name      = firstName;
    basicDetail.last_name       = lastName;
    basicDetail.gender          = gender;
    await basicDetail.save();

    return res.status(200).json( await getObject.getUserObject(user.id) );
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.editAdditionalDetails = async (req, res) => {
    const body = req.body;

    const creditCardNumber = body["credit_card_number"];
    const nationality      = body["nationality"];
    const accounts         = body["account"];
    const position         = body["position"];
    const image            = body["image"];
    const id               = body["id"];

    const user = await db.User.findOne({
        where:{
            id: id
        }
    });

    let additionalDetails;

    if( user.additional_details_id == null ){

        let positionId = null;
        if( !checkObject(position) ){
            // create new position record
                const positionRes = await addPosition.Add(position["latitude"] ,position["longitude"] ,
                                                          position["country"]  ,position["city"]);
            positionId = positionRes.id;
        }

        let accountId = null;
        if( !checkObject(accounts) ){
                // create new accounts record
                const accountRes = await addAccount.Add( accounts["twitter"] ,accounts["instagram"],
                                                         accounts["linkedin"],accounts["gmail"],
                                                         accounts["facebook"],accounts["telegram"] );
                accountId = await accountRes.id;
        }

        additionalDetails = await addAdditionalDetails.Add(image ,creditCardNumber ,nationality ,accountId ,positionId);

        user.additional_details_id = await additionalDetails.id;
        await user.save();
    }
    else{
        additionalDetails = await db.AdditionalDetails.findOne({
            where:{
                id: user.additional_details_id
            }
        });

        additionalDetails.credit_card_number = creditCardNumber;
        additionalDetails.nationality        = nationality;
        additionalDetails.image              = image;

        if( additionalDetails.account_id != null ) {
            const uAccounts = await db.Accounts.findOne({
                where:{
                    id: additionalDetails.account_id
                }
            });

            if( !checkObject(accounts) ){
                    uAccounts.instagram = accounts["instagram"];
                    uAccounts.linkedin  = accounts["linkedin"];
                    uAccounts.facebook  = accounts["facebook"];
                    uAccounts.telegram  = accounts["telegram"];
                    uAccounts.twitter   = accounts["twitter"];
                    uAccounts.gmail     = accounts["gmail"];
                    await uAccounts.save();
            }
            else await uAccounts.destroy();
        }
        else{
            if( !checkObject(accounts) ){
                    // create new accounts record
                    const account =  await addAccount.Add(accounts["twitter"] ,accounts["instagram"],
                                                          accounts["linkedin"],accounts["gmail"],
                                                          accounts["facebook"],accounts["telegram"] );

                    // assign id to company
                additionalDetails.account_id = account.id;
            }
        }
                
        if( additionalDetails.position_id != null ){
            const uPosition = await db.Position.findOne({
                where:{
                    id: additionalDetails.position_id
                }
            });
            if( !checkObject(position) ) {
                uPosition.longitude = position["longitude"];
                uPosition.latitude = position["latitude"];
                uPosition.country = position["country"];
                uPosition.city = position["city"];
                await uPosition.save();
            }
            else await uPosition.destroy();
        }
        else{
            if( !checkObject(position) ){
                    const uPosition = await addPosition.Add(position["latitude"] ,position["longitude"] ,
                                                            position["country"]  ,position["city"]);
                    // assign id to company
                additionalDetails.position_id = await uPosition.id;
            }
        }

        await additionalDetails.save();
    }

    const object = await getObject.getUserObject(user.id);

    if( object.additional_details_id != null ) {
        if( checkObject(object["additional_detail"]) ){
            await additionalDetails.destroy();
            object["additional_detail"] = null;
        }
    }

    return res.status(200).json( object );
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.editEducationalDetails = async (req ,res) => {
    const body = req.body;

    const languages_known   = body["languages_known"];
    const specialization    = body["specialization"];
    const education         = body["education"];
    const graduate          = body["graduate"];
    const courses           = body["courses"];
    const skills            = body["skills"];
    const c_v               = body["c_v"];
    const id                = body["id"];

    const user = await db.User.findOne({
        where:{
            id: id
        }
    });

    let educationalDetails;
    if( user.educational_details_id == null ){
        educationalDetails = await addEducationalDetails.Add(c_v ,skills ,courses ,graduate ,languages_known ,specialization ,education);

        user.educational_details_id = await educationalDetails.id;
        await user.save();
    }
    else{
        educationalDetails = await db.EducationaDetails.findOne({
            where:{
                id: user.educational_details_id
            }
        });

        educationalDetails.languages_known = languages_known;
        educationalDetails.specialization  = specialization;
        educationalDetails.education       = education;
        educationalDetails.graduate        = graduate;
        educationalDetails.courses         = courses;
        educationalDetails.skills          = skills;
        educationalDetails.c_v             = c_v;
        await educationalDetails.save();
    }

    const object = await getObject.getUserObject(user.id);

    if( user.educational_details_id != null ) {
        if( checkObject(object["educational_detail"]) ){
            await educationalDetails.destroy();
            object["educational_detail"] = null;
        }
    }

    return res.status(200).json( object );
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.editEmplotmentDetail = async (req ,res) => {
    const body = req.body;

    const date_of_start      = fromStringToDate(body["date_of_start"]);
    const date_of_end        = fromStringToDate(body["date_of_end"]);
    const employmentDetailId = body["employment_detail_id"];
    const country            = body["country"];
    const details            = body["details"];
    const user_id            = body["user_id"];
    const title              = body["title"];
    const city               = body["city"];

    const employmentDetail = await db.EmploymentDetails.findOne({
        where:{
            id: employmentDetailId
        }
    });

    employmentDetail.date_of_start  = date_of_start;
    employmentDetail.date_of_end    = date_of_end;
    employmentDetail.country        = country;
    employmentDetail.details        = details;
    employmentDetail.title          = title;
    employmentDetail.city           = city;
    await employmentDetail.save();
    
    return res.status(200).json( await getObject.getUserObject(user_id) );
}

exports.addEmplotmentDetail = async (req ,res) => {
    const body = req.body;

    const date_of_start = fromStringToDate(body["date_of_start"]);
    const date_of_end   = fromStringToDate(body["date_of_end"]);
    const country       = body["country"];
    const details       = body["details"];
    const user_id       = body["user_id"];
    const title         = body["title"];
    const city          = body["city"];
    
    await addEmplotmentDetail.Add(date_of_start ,date_of_end ,title ,city ,country ,details ,user_id);
    
    return res.status(201).json( await getObject.getUserObject(user_id) );
}

exports.deleteEmplotmentDetail = async (req ,res) => {
    const body = req.body;

    const employmentDetailId = body["employment_detail_id"];

    const employmantDetail = await db.EmploymentDetails.findOne({
        where:{
            id: employmentDetailId
        }
    });

    await employmantDetail.destroy();
    return res.sendStatus(200);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.applyForAJob = async (req ,res) => {
    const body = req.body;

    const {job_offer_id ,user_id} = body;

    const exist = await db.UserJobOffer.findOne({
        where: {
            job_offer_id: job_offer_id,
            user_id: user_id
        }
    });

    if( exist == null ){
        await db.UserJobOffer.create({
            user_id: user_id,
            job_offer_id: job_offer_id
        });

        return res.sendStatus(201);
    }
    const message = {
        notification: {
            title: "New User Request!!",
            body: "New user applied to your job offer, see his details 🧐."
        }
    };

    const jobOffer = await db.JobOffer.findOne({
        include:{
            model:db.Company
        },
        where: {
            id: job_offer_id
        }
    });

    if( jobOffer.company.registration_token != null ) await notification.sendNotification(jobOffer.company.registration_token, message);

    await db.Notification.create({
        title: message.notification.title,
        body: message.notification.body,
        date_of_send: new Date(),
        is_read: false,
        company_id: jobOffer.company.id
    });

    return res.sendStatus(403);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.deleteUserJobOffer = async (req ,res) => {
    const body = req.body;

    const {user_id ,job_id} = body;

    const userJobOffer = await db.UserJobOffer.findOne({
        where:{
            user_id: user_id,
            job_offer_id: job_id
        }
    });

    await userJobOffer.destroy();

    return res.sendStatus(200);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.jobFavoriteChanger = async (req,res) => {
    const body = req.body;

    const {user_id ,job_offer_id} = body;

    const isFavorite = await db.FavoriteUserJob.findOne({
        where :{
            job_offer_id: job_offer_id,
            user_id: user_id
        }
    });

    if( isFavorite == null ){
        await db.FavoriteUserJob.create({
            job_offer_id: job_offer_id,
            user_id: user_id
        });
    }
    else await isFavorite.destroy();

    return res.sendStatus(200);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.addFrJob = async (req ,res) => {
    const body = req.body;
    
    const {user_id ,title ,description ,image ,wage ,deadline ,skills} = body;

    await addFreelanceJob.addFreelnceJobOffer(user_id, new Date(), title, description,image , wage, fromStringToDate(deadline), skills)


    const message = {
        notification: {
            title: "New Freelancer Offer!!",
            body: "Jobless? There is new freelance offer in the app, Check it 😃"
        }
    };

    const allFreelancers = await db.Freelancer.findAll();

    for(let i in allFreelancers) {
        if( allFreelancers[i].registration_token != null ) await notification.sendNotification(allFreelancers[i].registration_token, message);

        await db.Notification.create({
            title: message.notification.title,
            body: message.notification.body,
            date_of_send: new Date(),
            is_read: false,
            freelancer_id_id: allFreelancers[i].id
        });
    }

    return res.sendStatus(201);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.editFrJob = async (req ,res) => {
    const body = req.body;

    const {id_fr_job ,title ,description ,image ,wage ,deadline ,skills} = body;

    const frJob = await db.FreelanceJobOffer.findOne({
        where : {
            id: id_fr_job
        }
    });

    frJob.title               = title;
    frJob.image               = image;
    frJob.wage                = wage;
    frJob.description         = description;
    frJob.deadline            = fromStringToDate(deadline);
    frJob.skills              = skills;

    await frJob.save();

    // maybe we will return new object
    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.deleteFrJob = async (req ,res) => {
    const body = req.body;

    const {freelance_job_offer_id} = body;

    const freelancerJobOffer = await db.FreelancerJobOffer.findAll({
        where : {
            freelance_job_offer_id : freelance_job_offer_id
        }
    });

    for(let i in freelancerJobOffer ) await freelancerJobOffer[i].destroy();

    const favorite = await db.FavoriteFreelancerFrJob.findAll({
        where:{
            freelance_job_offer_id : freelance_job_offer_id
        }
    });

    for(let i in favorite ) await favorite[i].destroy();

    const freelanceJobOffer = await db.FreelanceJobOffer.findOne({
        where : {
            id : freelance_job_offer_id
        }
    });
    
    await freelanceJobOffer.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.rejectFreelancer = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,freelance_job_offer_id} = body;

    const freelancerJobOffer = await db.FreelancerJobOffer.findOne({
        where:{
            freelancer_id: freelancer_id,
            freelance_job_offer_id: freelance_job_offer_id
        }
    });

    await freelancerJobOffer.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.acceptFreelancer = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,freelance_job_offer_id} = body;

    const freelancerJobOffer = await db.FreelancerJobOffer.findOne({
        where: {
            freelancer_id: freelancer_id,
            freelance_job_offer_id: freelance_job_offer_id
        }
    });

    const frJobOffer = await db.FreelanceJobOffer.findOne({
        where:{
            id: freelancerJobOffer.freelance_job_offer_id
        }
    });

    await addFreelanceJob.addFrJobOfferArchive(freelancerJobOffer.freelancer_id ,frJobOffer);

    const allFreelancerJobOffer = await db.FreelancerJobOffer.findAll({
        where: {
            freelance_job_offer_id: freelancerJobOffer.freelance_job_offer_id
        }
    });
    for(let i in allFreelancerJobOffer ) await allFreelancerJobOffer[i].destroy();

    const favorite = await db.FavoriteFreelancerFrJob.findAll({
        where: {
            freelance_job_offer_id:freelancerJobOffer.freelance_job_offer_id
        }
    });
    for(let i in favorite ) await favorite[i].destroy();

    await frJobOffer.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.rateCompany = async (req,res) => {
    const body = req.body;

    const {company_id ,user_id ,rate} = body;

    const archive = await db.JobArchive.findOne({
        where:{
            user_id: user_id,
            company_id: company_id
        }
    });

    if( archive == null )  return res.sendStatus(403);

    archive.rate = await parseFloat(rate);
    await archive.save();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.rateFreelancer = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,user_id ,rate} = body;

    const archive = await db.FreelancerJobArchive.findOne({
        where:{
            user_id: user_id,
            freelancer_id: freelancer_id
        }
    });

    if( archive == null )  return res.sendStatus(403);

    archive.rate = await parseFloat(rate);
    await archive.save();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.deleteAccount = async (req ,res) => {
    const body = req.body;

    const {id} = body;

    const user = await db.User.findOne({
        where: {
            id: id
        }
    });

    if( user != null ) {
        const employmentDetails = await db.EmploymentDetails.findAll({
            where: {
                user_id: id
            }
        });
        for (let i in employmentDetails) await employmentDetails[i].destroy();

        if (user.educational_details_id != null) {
            const educationaDetails = await db.EducationaDetails.findOne({
                where: {
                    id: user.educational_details_id
                }
            });
            await educationaDetails.destroy();
        }

        if (user.additional_details_id != null) {
            const additionalDetails = await db.AdditionalDetails.findOne({
                where: {
                    id: user.additional_details_id
                }
            });

            if (additionalDetails.account_id != null) {
                const accounts = await db.Accounts.findOne({
                    where: {
                        id: additionalDetails.account_id
                    }
                });
                await accounts.destroy();
            }

            if (additionalDetails.position_id != null) {
                const position = await db.Position.findOne({
                    where: {
                        id: additionalDetails.position_id
                    }
                });
                await position.destroy();
            }

            await additionalDetails.destroy();
        }

        const favoriteUserJobs = await db.FavoriteUserJob.findAll({
            where: {
                user_id: id
            }
        });
        for (let i in favoriteUserJobs) await favoriteUserJobs[i].destroy();

        const userJobOffers = await db.UserJobOffer.findAll({
            where: {
                user_id: id
            }
        });
        for (let i in userJobOffers) await userJobOffers[i].destroy();

        const frJobOffer = await db.FreelanceJobOffer.findAll({
            where: {
                user_id: id
            }
        });

        for (let i in frJobOffer) {
            const favoriteFreelancerFrJob = await db.FavoriteFreelancerFrJob.findAll({
                where: {
                    freelance_job_offer_id: frJobOffer[i].id
                }
            });
            for (let j in favoriteFreelancerFrJob) await favoriteFreelancerFrJob[j].destroy();


            const freelancerJobOffer = await db.FreelancerJobOffer.findAll({
                where: {
                    freelance_job_offer_id: frJobOffer[i].id
                }
            });
            for (let j in freelancerJobOffer) await freelancerJobOffer[j].destroy();
        }
        for (let i in frJobOffer) await frJobOffer[i].destroy();

        const frJobArchive = await db.FreelancerJobArchive.findAll({
            where: {
                user_id: id
            }
        });
        for (let i in frJobArchive) await frJobArchive[i].destroy();

        const jobArchive = await db.JobArchive.findAll({
            where: {
                user_id: id
            }
        });
        for(let i in jobArchive){
            jobArchive[i].user_id = null;
            await jobArchive[i].save();
        }

        const loginId = await db.LoginId.findOne({
            where: {
                user_id: id
            }
        });
        await loginId.destroy();

        const notifications = await db.Notification.findAll({
            where:{
                user_id: id
            }
        });
        for(let i in notifications) await notifications[i].destroy();
        
        await user.destroy();

        const basicDetails = await db.BasicDetails.findOne({
            where: {
                id: user.basic_details_id
            }
        });

        await basicDetails.destroy();

        return res.sendStatus(200);
    }

    return res.sendStatus(404);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.getListOfJobOffers = async (req ,res) => {
    const {user_id} = req.body;

    const jobOffers = await db.JobOffer.findAll();

    let response = [];
    for(let i in jobOffers){
         const jobOffer = await getObject.getJobOfferObject(jobOffers[i].id);

         const favorite = await db.FavoriteUserJob.findOne({
             where:{
                 user_id: user_id,
                 job_offer_id: jobOffers[i].id
             }
         });

         jobOffer.favorite = await (favorite != null);

         response.push(jobOffer);
    }

    return res.status(302).json(response);
}
// =============================================== //
// =============================================== //
// =============================================== //

exports.getListOfItsFrJobOffers = async (req ,res) => {
    const id = req.body.id;

    const frJobOffers = await db.FreelanceJobOffer.findAll({
        where:{
            user_id: id
        }
    });

    const response = [];
    for(let i in frJobOffers){
        response.push( await getObject.getFrJobOfferObject(frJobOffers[i].id) );
    }

    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfInComeReqForFrJobOffer = async (req ,res) => {
    const body = req.body;

    const {freelance_job_offer_id} = body;

    const freelancerFrJobOffer = await db.FreelancerJobOffer.findAll({
        where:{
            freelance_job_offer_id: freelance_job_offer_id
        }
    });

    let response = [];
    for(let i in freelancerFrJobOffer){
        const freelancer = await getObject.getFreelancerObject(freelancerFrJobOffer[i].freelancer_id);
        response.push({
            object: freelancer
        });
    }
    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfFavoriteJobOffer = async (req ,res) => {
    const body = req.body;

    const {user_id} = body;

    const favorite = await db.FavoriteUserJob.findAll({
        where: {
            user_id: user_id
        },
        include: {
            model:db.JobOffer,
            include:db.JobConditions
        }
    });

    let response = [];
    for(let i in favorite){
        const jobFavorite = await getObject.getJobOfferObject(favorite[i].job_offer_id);
        jobFavorite.favorite = true;
        response.push(jobFavorite);
    }

    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfAppliedJob = async (req ,res) => {
    const body = req.body;

    const {user_id} = body;

    const userJobs = await db.UserJobOffer.findAll({
        where:{
            user_id : user_id
        }
    });

    let resposnse = [];
    for(let i in userJobs){
        const jobOffer = await getObject.getJobOfferObject(userJobs[i].job_offer_id);
        resposnse.push(jobOffer);
    }

    return res.status(302).json(resposnse);
}


// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfFreelancer = async (req ,res) => {
    const freelancers = await db.Freelancer.findAll();

    let resposnse = [];
    for(let i in freelancers){
        const fr = await getObject.getFreelancerObject(freelancers[i].id);
        await resposnse.push({
            object: fr
        });
    }
    console.log(resposnse);
    return res.status(302).json(resposnse);
}



// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getUser = async (req ,res) => {
    const id = req.body.id;

    const user = await getObject.getUserObject(id);

    return res.status(302).json(user);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getUserEmploymentDetails = async (req ,res) => {
    const id = req.body.id;

    const employmentDetails = await db.EmploymentDetails.findAll({
        where:{
            user_id: id
        }
    });

    return res.status(302).json(employmentDetails);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///
