const addPosition   = require('../database/Methods/AddPosition');
const checkObject   = require('./Methods/checkObject');
const addAccount    = require('../database/Methods/AddAccount');
const getObject     = require('../Classes/getObject');
const addJob        = require('../database/Methods/AddJob');
const db            = require('../database/myDB');

// =============================================== //
// =============================================== //
// =============================================== //

exports.editProfile = async (req ,res) => {
    const body = req.body;

    const {id ,name ,image ,account ,position ,description ,specialization} = body;
    
    const company = await db.Company.findOne({
        where: {
            id: id
        }
    });

    company.specialization  = specialization;
    company.description     = description;
    company.image           = image;
    company.name            = name;

    /// -- edit accounts -- ///
    if( company.account_id != null ) {
        let coAccounts = await db.Accounts.findOne({
            where:{
                id: company.account_id
            }
        });

        if( !checkObject(account) ) {
            coAccounts.instagram = account["instagram"];
            coAccounts.linkedin  = account["linkedin"];
            coAccounts.facebook  = account["facebook"];
            coAccounts.telegram  = account["telegram"];
            coAccounts.twitter   = account["twitter"];
            coAccounts.gmail     = account["gmail"];
            await coAccounts.save();
        }
        else await coAccounts.destroy();
    }
    else{
        if( !checkObject(account) ){
            // create new accounts record
            const coAccounts = await addAccount.Add(account["twitter"], account["instagram"],
                                                    account["linkedin"], account["gmail"],
                                                    account["facebook"], account["telegram"]);
            company.account_id = await coAccounts.id;
        }
    }

    /// -- edit position -- ///
    if( company.position_id != null ){
        let coPosition = await db.Position.findOne({
            where: {
                id: company.position_id
            }
        });

        if( !checkObject(position) ){
                coPosition.longitude = position["longitude"];
                coPosition.latitude  = position["latitude"];
                coPosition.country   = position["country"];
                coPosition.city      = position["city"];
                await coPosition.save();
        }
        else await coPosition.destroy();
    }
    else{
        if( !checkObject(position) ){
                let coPosition = await addPosition.Add( position["latitude"] ,position["longitude"] ,
                                                        position["country"]  ,position["city"]);
                company.position_id = await coPosition.id;
        }
    }

    await company.save();
    return res.status(200).json( await getObject.getCompanyObject(id) );
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.sendJopToAdmin = async (req ,res) => {
    const body = req.body;
    
    const {image ,title ,salary ,company_id ,description ,job_condition ,duration_of_job ,shift_time_of_job ,number_of_vacancies} = body;

    let jobConditionId = null;
    if( !checkObject(job_condition) ){
        const jobCondition = await addJob.addJobCondition(job_condition);
        jobConditionId = jobCondition.id;
    }


    await addJob.addJobOfferAdminAccepter(company_id ,new Date() ,title ,description ,image,
                                          salary ,duration_of_job ,shift_time_of_job ,
                                          number_of_vacancies ,jobConditionId);

    return res.sendStatus(201);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.editJob = async (req ,res) => {
    const body = req.body;

    const {image ,title ,salary ,id ,description ,job_condition ,duration_of_job ,shift_time_of_job ,number_of_vacancies} = body;

    const job = await db.JobOffer.findOne({
        where : {
            id: id
        }
    });

    job.title               = title;
    job.image               = image;
    job.salary              = salary;
    job.description         = description;
    job.duration_of_job     = duration_of_job;
    job.shift_time_of_job   = shift_time_of_job;
    job.number_of_vacancies = number_of_vacancies;

    if( !checkObject(job_condition) ){
        if( job.job_condition_id == null ){
            const condition = await addJob.addJobCondition(job_condition);
            job.job_condition_id = await condition.id;
        }
        else {
            const condition = await db.JobConditions.findOne({
                where:{
                    id: job.job_condition_id
                }
            });

            condition.years_of_experience   = job_condition["years_of_experience"];
            condition.education_level       = job_condition["education"];
            condition.specialization        = job_condition["specialization"];
            condition.nationality           = job_condition["nationality"];
            condition.languages             = job_condition["languages"];
            condition.country               = job_condition["country"];
            condition.skills                = job_condition["skills"];
            condition.gender                = job_condition["gender"];
            condition.age                   = job_condition["age"];
    
           await condition.save();
        }
    }
    else{
        if( job.job_condition_id != null ){
            const condition = await db.JobConditions.findOne({
                where:{
                    id: job.job_condition_id
                }
            });
            
            await condition.destroy();

            job.job_condition_id = null;
        }
    }
    
    await job.save();

    // maybe we will return new object
    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.deleteJobBeforeAdminAccept = async (req ,res) => {
    const body = req.body;

    const {job_offer_admin_accepter_id} = body;

    const jobOfferAdminAccepter = await db.JobOfferAdminAccepter.findOne({
        where:{
            id: job_offer_admin_accepter_id
        }
    });

    if( jobOfferAdminAccepter.job_condition_id != null ){
        const condition = await db.JobConditions.findOne({
            where: {
                id: jobOfferAdminAccepter.job_condition_id
            }
        });
        await condition.destroy();
    }

    await jobOfferAdminAccepter.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.deleteJobAfterAdminAccept = async (req ,res) => {
    const body = req.body;

    const {job_offer_id} = body;

    const userJobOffer = await db.UserJobOffer.findAll({
        where : {
            job_offer_id : job_offer_id
        }
    });

    for(let i in userJobOffer ) await userJobOffer[i].destroy();

    const favorite = await db.FavoriteUserJob.findAll({
        where:{
            job_offer_id : job_offer_id
        }
    });

    for(let i in favorite ) await favorite[i].destroy();

    const jobOffer = await db.JobOffer.findOne({
        where : {
            id : job_offer_id
        }
    });

    if(jobOffer.job_condition_id != null){
        const conditions = await db.JobConditions.findOne({
            where:{
                id : jobOffer.job_condition_id
            }
        });
        await  conditions.destroy();
    }

    await jobOffer.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.acceptUser = async (req ,res) => {
    const body = req.body;

    const {user_id ,job_offer_id} = body;

    const userJobOffer = await db.UserJobOffer.findOne({
        where: {
            user_id: user_id,
            job_offer_id: job_offer_id
        }
    });
    await userJobOffer.destroy();

    const jobOffer = await db.JobOffer.findOne({
        where:{
            id: job_offer_id
        },
        include: db.JobConditions
    });

    await addJob.addJobOfferArchive(user_id ,jobOffer ,jobOffer.job_condition);

    let number_of_vacancies = jobOffer.number_of_vacancies;
    
    if( number_of_vacancies === 1 ){
        await db.UserJobOffer.destroy({
            where:{
                job_offer_id: job_offer_id
            }
        });

        await db.FavoriteUserJob.destroy({
            where:{
                job_offer_id: job_offer_id
            }
        });

        if( jobOffer.job_condition_id != null ){
            await db.JobConditions.destroy({
                where:{
                    id: jobOffer.job_condition_id
                }
            });
        }

        await jobOffer.destroy();
    }
    else{
        jobOffer.number_of_vacancies = number_of_vacancies - 1;
        await jobOffer.save();
    }

    return res.sendStatus(201);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.rejectUser = async (req ,res) => {
    const body = req.body;

    const {user_id ,job_offer_id} = body;

    const userJobOffer = await db.UserJobOffer.findOne({
        where:{
            user_id: user_id,
            job_offer_id: job_offer_id
        }
    });
    
    await userJobOffer.destroy();

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.deleteAccount = async (req,res) => {
    const body = req.body;
    const {id} = body;

    const company = await db.Company.findOne({
        where:{
            id:id
        }
    });

    
    // delete Social Account
    if( company.account_id != null ) {
        const account = await db.Accounts.findOne({
            where: {
                id: company.account_id
            }
        });
        await account.destroy();
    }

    // delete position
    if( company.position_id != null ) {
        const posiion = await db.Position.findOne({
            where: {
                id: company.position_id
            }
        });
        await posiion.destroy();
    }

    // delete login
    const login = await db.LoginId.findOne({
        where:{
            company_id: id
        }
    });
    await login.destroy();

    // delete all jobs befor admin acceptet
    const jobOfferBeforAdminAccept = await db.JobOfferAdminAccepter.findAll({
        where:{
            company_id: id
        }
    });

    for(let i in jobOfferBeforAdminAccept){
        if( jobOfferBeforAdminAccept[i].job_condition_id != null ){
            const condition = await db.JobConditions.findOne({
                where:{
                    id: jobOfferBeforAdminAccept[i].job_condition_id
                }
            });
            await condition.destroy();
        }
    }

    for(let i in jobOfferBeforAdminAccept ) await jobOfferBeforAdminAccept[i].destroy();

    // delete all jobs after admin acceptet
    const AllJobOffers = await db.JobOffer.findAll({
        where:{
            company_id: id
        }
    });

    /*let jobOffers = [];
    for(let i in AllJobOffers){
        jobOffers.push(
             JobOfferObj.get(
                await AllJobOffers[i] ,
                await getObject.getJobCondition(AllJobOffers[i].job_condition_id) ,
                await getObject.getCompanyObject(AllJobOffers[i].company_id)
            )
        );
    }
*/
    for(let i in AllJobOffers){
        if( AllJobOffers[i].job_condition_id != null ){
            const condition = await db.JobConditions.findOne({
                where:{
                    id: AllJobOffers[i].job_condition_id
                }
            });
            await condition.destroy();
        }

        const userJobOffer = await db.UserJobOffer.findAll({
            where:{
                job_offer_id: AllJobOffers[i].id
            }
        });

        for(let j in userJobOffer) await userJobOffer[j].destroy();

        const favorite = await db.FavoriteUserJob.findAll({
            where:{
                job_offer_id: AllJobOffers[i].id
            }
        });

        for(let j in favorite) await favorite[j].destroy();
    }

    for(let i in AllJobOffers) 
        await AllJobOffers[i].destroy();
    

    const jobArchive = await db.JobArchive.findAll({
        where:{
            company_id:id
        }
    });
    
    for(let i in jobArchive) await jobArchive[i].destroy();
    
    const notifications = await db.Notification.findAll({
        where:{
            company_id:id
        }
    });
    for(let i in notifications) await notifications[i].destroy();
    
    await company.destroy();
    

    return res.sendStatus(200);
}

// =============================================== //
// =============================================== //
// =============================================== //

exports.getListOfInComeReqForJobOffer = async (req ,res) => {
    const body = req.body;

    const {job_offer_id} = body;

    const userJobOffer = await db.UserJobOffer.findAll({
        where:{
            job_offer_id: job_offer_id,
        }
    });

    let response = [];
    for(let i in userJobOffer){
        const user = await getObject.getUserObject(userJobOffer[i].user_id);
        response.push({
            object: user
        });
    }

    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfItsJobOffers = async (req ,res) => {
    const id = req.body.user_id;

    const jobOffers = await db.JobOffer.findAll({
        where: {
            company_id : id
        }
    });

    let response = [];
    for(let i in jobOffers){
        const job = await getObject.getJobOfferObject(jobOffers[i].id);
        response.push(job);
    }

    return res.status(302).json(response);
}


// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getListOfItsJobOffersBAA = async (req ,res) => {
    const id = req.body.id;

    const jobOffersBAA = await db.JobOfferAdminAccepter.findAll({
        where: {
            company_id : id
        }
    });

    let response = [];
    for(let i in jobOffersBAA){
        const job = await getObject.getJobOfferBAAObject(jobOffersBAA[i].id);
        response.push(job);
    }

    return res.status(302).json(response);
}

// ============================================== ///
// ============================================== ///
// ============================================== ///

exports.getCompany = async (req ,res) => {
    const id = req.body.id;

    const company = await getObject.getCompanyObject(id);

    return res.status(302).json(company);
}
