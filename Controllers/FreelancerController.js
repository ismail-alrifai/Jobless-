const addEducationalDetails = require('../database/Methods/AddEducationalDetails');
const addAdditionalDetails  = require('../database/Methods/AddAdditionalDetails');
const addPreviousWorks      = require('../database/Methods/AddPreviousWork');
const fromStringToDate      = require('./Methods/fromStringToDate');
const notification          = require('./Contact/NotificationsController');
const checkObject           = require('./Methods/checkObject');
const addPosition           = require('../database/Methods/AddPosition');
const addAccount            = require('../database/Methods/AddAccount');
const getObject             = require('../Classes/getObject');
const db                    = require('../database/myDB');

/// =========================================== ///
/// =========================================== ///
/// =========================================== ///

exports.editBasicDetails = async (req ,res) => {
    const body = req.body;

    const birthday          = fromStringToDate(body["birthday"]);
    const phoneNumber       = body["phone_number"];
    const firstName         = body["first_name"];
    const lastName          = body["last_name"];
    const gender            = body["gender"];
    const id                = body["id"];

    const freelancer = await db.Freelancer.findOne({
        where:{
            id: id
        }
    });

    const basicDetail = await db.BasicDetails.findOne({
        where:{
            id: freelancer.basic_details_id
        }
    });

    basicDetail.birthday_date   = birthday;
    basicDetail.phone_number    = phoneNumber;
    basicDetail.first_name      = firstName;
    basicDetail.last_name       = lastName;
    basicDetail.gender          = gender;
    await basicDetail.save();

    return res.status(200).json( await getObject.getFreelancerObject(freelancer.id) );
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

    const freelancer = await db.Freelancer.findOne({
        where:{
            id: id
        }
    });

    let additionalDetails;
    if( freelancer.additional_details_id == null ){

        let positionId = null;
        if( !checkObject(position) ){
                // create new position record
                let positionRes = await addPosition.Add(position["latitude"] ,position["longitude"] ,
                                                        position["country"]  ,position["city"]);
                positionId = positionRes.id;
        }

        let accountId = null;
        if( !checkObject(accounts) ){
                // create new accounts record
                let accountRes = await addAccount.Add(accounts["twitter"]  ,accounts["instagram"],
                                                      accounts["linkedin"] ,accounts["gmail"],
                                                      accounts["facebook"] ,accounts["telegram"] );
                accountId = await accountRes.id;
        }

        additionalDetails = await addAdditionalDetails.Add(image ,creditCardNumber ,nationality ,accountId ,positionId);

        freelancer.additional_details_id = additionalDetails.id;
        await freelancer.save();
    }
    else{
        additionalDetails = await db.AdditionalDetails.findOne({
            where:{
                id: freelancer.additional_details_id
            }
        });

        additionalDetails.credit_card_number = creditCardNumber;
        additionalDetails.nationality        = nationality;
        additionalDetails.image              = image;

        if( additionalDetails.account_id != null ) {
            const fAccounts = await db.Accounts.findOne({
                where:{
                    id: additionalDetails.account_id
                }
            });

            if( !checkObject(accounts) ) {
                    fAccounts.instagram = accounts["instagram"];
                    fAccounts.linkedin = accounts["linkedin"];
                    fAccounts.facebook = accounts["facebook"];
                    fAccounts.telegram = accounts["telegram"];
                    fAccounts.twitter = accounts["twitter"];
                    fAccounts.gmail = accounts["gmail"];
                    await fAccounts.save();
            }
            else await fAccounts.destroy();
        }
        else{
            if( !checkObject(accounts) ){
                    // create new accounts record
                    const account = await addAccount.Add( accounts["twitter"] ,accounts["instagram"],
                                                          accounts["linkedin"],accounts["gmail"],
                                                          accounts["facebook"],accounts["telegram"] );
                    // assign id to company
                    additionalDetails.account_id = account.id;
            }
        }
                
        if( additionalDetails.position_id != null ){
            const fPosition = await db.Position.findOne({
                where:{
                    id: additionalDetails.position_id
                }
            });

            if( !checkObject(position) ) {
                    fPosition.longitude = position["longitude"];
                    fPosition.latitude = position["latitude"];
                    fPosition.country = position["country"];
                    fPosition.city = position["city"];
                    await fPosition.save();
            }
            else await fPosition.destroy();
        }
        else{
            if( !checkObject(position) ){
                    const fPosition = await addPosition.Add(position["latitude"] ,position["longitude"] ,
                                                            position["country"]  ,position["city"]);
                    // assign id to company
                    additionalDetails.position_id = fPosition.id;
            }
        }

        await additionalDetails.save();
    }

    const object = await getObject.getFreelancerObject(freelancer.id);
    if( freelancer.additional_details_id != null ) {
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

    const {languages_known ,specialization ,education ,graduate ,courses ,skills ,c_v ,id} = body;

    const freelancer = await db.Freelancer.findOne({
        where:{
            id: id
        }
    });

    let educationallDetails;
    if( freelancer.educational_details_id == null ){
        educationallDetails = await addEducationalDetails.Add(c_v ,skills ,courses ,graduate ,languages_known ,specialization ,education);
    
        freelancer.educational_details_id = await educationallDetails.id;
        await freelancer.save();
    }
    else{
        educationallDetails = await db.EducationaDetails.findOne({
            where:{
                id: freelancer.educational_details_id
            }
        });

        educationallDetails.languages_known = languages_known;
        educationallDetails.specialization  = specialization;
        educationallDetails.education       = education;
        educationallDetails.graduate        = graduate;
        educationallDetails.courses         = courses;
        educationallDetails.skills          = skills;
        educationallDetails.c_v             = c_v;
        await educationallDetails.save();
    }

    const object = await getObject.getFreelancerObject(freelancer.id);
    if( freelancer.educational_details_id != null ) {
        if( checkObject(object["educational_detail"]) ){
            await educationallDetails.destroy();
            object["educational_detail"] = null;
        }
    }

    return res.status(200).json( object );
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.editPreviousWorks = async (req ,res) => {
    const body = req.body;

    const {previous_works_id ,freelancer_id ,link} = body;
    const previousWork = await db.PreviousWorks.findOne({
        where:{
            id: previous_works_id
        }
    });
    previousWork.link = link; 
    await previousWork.save();
    
    return res.status(200).json( await getObject.getFreelancerObject(freelancer_id) );
}

exports.addPreviousWorks = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,link} = body;

    await addPreviousWorks.Add(link ,freelancer_id);

    return res.status(201).json( await getObject.getFreelancerObject(freelancer_id) );
}

exports.deletePreviousWorks = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,previous_works_id} = body;

    const previousWork = await db.PreviousWorks.findOne({
        where:{
            id: previous_works_id
        }
    });

    await previousWork.destroy();

    return res.status(200).json( await getObject.getFreelancerObject(freelancer_id) );
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.frJobFavoriteChanger = async (req ,res) => {
    const body = req.body;

    const {freelancer_id ,freelance_job_offer_id} = body;

    const isFavorite = await db.FavoriteFreelancerFrJob.findOne({
        where :{
            freelance_job_offer_id: freelance_job_offer_id,
            freelancer_id: freelancer_id
        }
    });

    if( isFavorite == null ){
        await db.FavoriteFreelancerFrJob.create({
            freelance_job_offer_id: freelance_job_offer_id,
            freelancer_id: freelancer_id
        });
    }
    else await isFavorite.destroy();

    return res.sendStatus(200);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.applyForAFrJob = async (req ,res) => {
    const body = req.body;

    const {freelance_job_offer_id ,freelancer_id} = body;

    const exist = await db.FreelancerJobOffer.findOne({
        where: {
            freelance_job_offer_id: freelance_job_offer_id,
            freelancer_id: freelancer_id
        }
    });

    if( exist == null ){
        await db.FreelancerJobOffer.create({
            freelancer_id: freelancer_id,
            freelance_job_offer_id: freelance_job_offer_id
        });

        return res.sendStatus(201);
    }
    const message = {
        notification: {
            title: "New Freelancer Request!!",
            body: "New freelancer applied to your freelance job offer, see his details 🧐."
        }
    };

    const freelanceJobOffer = await db.FreelanceJobOffer.findOne({
        include:{
            model:db.User
        },
        where: {
            id: freelance_job_offer_id
        }
    });

    if( freelanceJobOffer.user.registration_token != null ) await notification.sendNotification(freelanceJobOffer.user.registration_token, message);

    await db.Notification.create({
        title: message.notification.title,
        body: message.notification.body,
        date_of_send: new Date(),
        is_read: false,
        user_id: freelanceJobOffer.user.id
    });

    return res.sendStatus(403);
}

// ================================================================================== //
// ================================================================================== //
// ================================================================================== //

exports.deleteFreelancerJobOffer = async (req ,res) => {
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


exports.deleteAccount = async (req ,res) => {
    const body = req.body;

    const {id} = body;

    const freelancer = await db.Freelancer.findOne({
        where: {
            id: id
        }
    });

    if( freelancer != null ) {
        const previousWorks = await db.PreviousWorks.findAll({
            where: {
                freelancer_id: id
            }
        });
        for (let i in previousWorks) await previousWorks[i].destroy();

        if (freelancer.educational_details_id != null) {
            const educationalDetails = await db.EducationaDetails.findOne({
                where: {
                    id: freelancer.educational_details_id
                }
            });
            await educationalDetails.destroy();
        }

        if (freelancer.additional_details_id != null) {
            const additionalDetails = await db.AdditionalDetails.findOne({
                where: {
                    id: freelancer.additional_details_id
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

        const loginId = await db.LoginId.findOne({
            where: {
                freelancer_id: id
            }
        });
        await loginId.destroy();

        const favoriteFreelancerFrJob = await db.FavoriteFreelancerFrJob.findAll({
            where: {
                freelancer_id: id
            }
        });
        for (let i in favoriteFreelancerFrJob) await favoriteFreelancerFrJob[i].destroy();

        const freelancerFrJob = await db.FreelancerJobOffer.findAll({
            where: {
                freelancer_id: id
            }
        });
        for (let i in freelancerFrJob) await freelancerFrJob[i].destroy();

        const frJobArchive = await db.FreelancerJobArchive.findAll({
            where: {
                freelancer_id: id
            }
        });
        for(let i in frJobArchive){
            frJobArchive[i].freelancer_id= null;
            await frJobArchive[i].save();
        }

        const notifications = await db.Notification.findAll({
            where:{
                freelancer_id: id
            }
        });
        for(let i in notifications) await notifications[i].destroy();

        await freelancer.destroy();

        const basicDetails = await db.BasicDetails.findOne({
            where: {
                id: freelancer.basic_details_id
            }
        });
        await basicDetails.destroy();

        return res.sendStatus(200);
    }
    return res.sendStatus(404);
}

// =========================================== //
// =========================================== //
// =========================================== //

exports.getListOfFrJobOffers = async (req ,res) => {
    const {id} = req.body;

    const frJobOffers = await db.FreelanceJobOffer.findAll();

    let response = [];
    for(let i in frJobOffers){
        const frJobOffer = await getObject.getFrJobOfferObject(frJobOffers[i].id);

        const favorite = await db.FavoriteFreelancerFrJob.findOne({
            where:{
                freelancer_id: id,
                freelance_job_offer_id: frJobOffers[i].id
            }
        });

        frJobOffer.favorite = await (favorite != null);

        response.push(frJobOffer);
    }

    return res.status(302).send(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfFavoriteFrJobOffer = async (req ,res) => {
    const body = req.body;

    const {freelancer_id} = body;

    const favorite = await db.FavoriteFreelancerFrJob.findAll({
        where: {
            freelancer_id: freelancer_id
        },
        include:db.FreelanceJobOffer,
    });

    let response = [];
    for(let i in favorite){
        const frFavorite = await getObject.getFrJobOfferObject(favorite[i].freelance_job_offer_id);
        frFavorite.favorite = true;
        response.push(frFavorite);
    }

    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfAppliedFrJob = async (req ,res) => {
    const body = req.body;

    const {freelancer_id} = body;

    const freelancerFrJobs = await db.FreelancerJobOffer.findAll({
        where:{
            freelancer_id : freelancer_id
        }
    });

    let resposnse = [];
    for(let i in freelancerFrJobs){
        const frJobOffer = await getObject.getFrJobOfferObject(freelancerFrJobs[i].freelance_job_offer_id);
        resposnse.push(frJobOffer);
    }

    return res.status(302).json(resposnse);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.addPortofolio = async (req ,res) => {
    const body = req.body;

    const {id, portofolio} = body;

    const freelancer = await db.Freelancer.findOne({
        where: {
            id: id
        }
    });

    freelancer.portofilo = portofolio;
    await freelancer.save();

    return res.status(201).send(portofolio);
}


// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.deletePortofolio = async (req ,res) => {
    const body = req.body;

    const {id} = body;

    const freelancer = await db.Freelancer.findOne({
        where: {
            id: id
        }
    });

    freelancer.portofilo = null;
    await freelancer.save();

    return res.sendStatus(200);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getFreelancer = async (req ,res) => {
    const id = req.body.id;

    const freelancer = await getObject.getFreelancerObject(id);

    return res.status(302).json(freelancer);
}
// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getFreelancerPreviousWorks = async (req ,res) => {
    const id = req.body.id;

    const prevWorks = await db.PreviousWorks.findAll({
        where:{
            freelancer_id: id
        }
    });

    return res.status(302).json(prevWorks);
}
