const db = require('../../database/myDB');

// ================================================= //
// ================================================= //
// ================================================= //

exports.getFreelancerKeywords = async (req ,res) => {
    const allFrJobOffer = await db.FreelanceJobOffer.findAll();

    let setOfKeywords = new Set();
    for(let i in allFrJobOffer){
        setOfKeywords.add(allFrJobOffer[i].title);
    }

    let response = [];
    for(let i of setOfKeywords){
        response.push(i);
    }

    return res.status(302).json(response);
}

// ================================================= //
// ================================================= //
// ================================================= //

exports.getUserKeywords = async (req ,res) => {
    const allJobCond = await db.JobConditions.findAll();

    let setOfKeywords = new Set();
    for(let i in allJobCond){
        setOfKeywords.add(allJobCond[i].specialization);
    }

    let response = [];
    for(let i of setOfKeywords){
        response.push(i);
    }

    return res.status(302).json(response);
}