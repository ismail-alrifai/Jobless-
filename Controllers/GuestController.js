const db        = require('../database/myDB');
const getObject = require('../Classes/getObject');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getAllFrJob = async (req ,res) => {
    const frjobs = await db.FreelanceJobOffer.findAll();

    let response = [];
    for(let i in frjobs){
        const frjob = await getObject.getFrJobOfferObject(frjobs[i].id);
        frjob.favorite = false;
        response.push(frjob);
    }

    return res.status(302).send(response);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getAllJob = async (req ,res) => {
    const jobs = await db.JobOffer.findAll();

    let response = [];
    for(let i in jobs){
        const job = await getObject.getJobOfferObject(jobs[i].id);
        job.favorite = false;
        response.push(job);
    }

    return res.status(302).send(response);
}