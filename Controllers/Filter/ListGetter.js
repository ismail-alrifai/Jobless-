const db        = require('../../database/myDB');
const getObject = require('../../Classes/getObject');

// ----------------------------- //
// ----------------------------- //
// ----------------------------- //

exports.getJobOfferList = async (req ,res ,next) => {
    const user_id = req.body.user_id;
    const jobs = await db.JobOffer.findAll({
        include:{
            model: db.JobConditions
        }
    });

    let list = [];
    for(let i in jobs){
        const job = await getObject.getJobOfferObject(jobs[i].id);

        const friv = await db.FavoriteUserJob.findOne({
            where:{
                user_id: user_id,
                job_offer_id: jobs[i].id
            }
        });
        job.favorite = (friv != null);

        list.push(job);
    }

    req.body.list = list;
    next();
}

// ----------------------------- //
// ----------------------------- //
// ----------------------------- //

exports.getFrJobOfferList = async (req ,res ,next) => {
    const freelancer_id = req.body.freelancer_id;
    const jobs = await db.FreelanceJobOffer.findAll();

    let list = [];
    for(let i in jobs){
        const job = await getObject.getFrJobOfferObject(jobs[i].id);

        const friv = await db.FavoriteFreelancerFrJob.findOne({
            where:{
                freelancer_id: freelancer_id,
                freelance_job_offer_id: jobs[i].id
            }
        });
        job.favorite = (friv != null);

        list.push(job);
    }

    req.body.list = list;
    next();
}

// ----------------------------- //
// ----------------------------- //
// ----------------------------- //

exports.getIncomeJobOfferList = async (req ,res ,next) => {
    const id = req.body.id;
    const jobs = await db.UserJobOffer.findAll({
        where: {
            job_offer_id: id
        }
    });

    let list = [];
    for(let i in jobs){
        const job = await getObject.getUserObject(jobs[i].user_id);
        list.push(job);
    }

    req.body.list = list;
    next();
}
// ----------------------------- //
// ----------------------------- //
// ----------------------------- //

exports.getIncomeFrJobOfferList = async (req ,res ,next) => {
    const id = req.body.id;
    const jobs = await db.FreelancerJobOffer.findAll({
        where: {
            freelance_job_offer_id: id
        }
    });

    let list = [];
    for(let i in jobs){
        const job = await getObject.getFreelancerObject(jobs[i].freelancer_id);
        list.push(job);
    }

    req.body.list = list;
    next();
}