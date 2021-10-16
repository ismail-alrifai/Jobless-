const db        = require('../../database/myDB');
const {Op}      = require("sequelize");
const getObject = require('../../Classes/getObject');

/// ======================================== ///
/// ======================================== ///
/// ======================================== ///

exports.JobOfferSearch = async (req ,res) => {
    const body = req.body;

    const {id ,title} = body;

    const allJobs = await db.JobOffer.findAll({
       include:[{
           model: db.JobConditions,
           where:{
               specialization: {
                   [Op.substring]: title
               }
           }
       }]
    });

    let response = [];
    for(let i in allJobs){
        const job = await getObject.getJobOfferObject(allJobs[i].id);

        const favorite = await db.FavoriteUserJob.findOne({
            where:{
                user_id: id
            }
        });

        job.favorite = (favorite != null);

        response.push(job);
    }

    return res.status(302).json(response);
}

/// ======================================== ///
/// ======================================== ///
/// ======================================== ///

exports.FrJobOfferSearch = async (req ,res) => {
    const body = req.body;

    const {id ,title} = body;

    const allJobs = await db.FreelanceJobOffer.findAll({
        where:{
            title: {
                [Op.substring]: title
            }
        }
    });

    let response = [];
    for(let i in allJobs){
        const job = await getObject.getFrJobOfferObject(allJobs[i].id);

        const favorite = await db.FavoriteFreelancerFrJob.findOne({
            where:{
                freelancer_id: id
            }
        });

        job.favorite = (favorite != null);

        response.push(job);
    }

    return res.status(302).json(response);
}

/// ======================================== ///
/// ======================================== ///
/// ======================================== ///