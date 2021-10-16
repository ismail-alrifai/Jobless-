const db            = require('../../database/myDB');
const {Op}          = require("sequelize");
const nodemailer    = require('nodemailer');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.sendNotificationByGmail = async () => {
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mril2021proj1@gmail.com",
            pass: "mril12345",
        }
    });

    const proposingJobs = await db.ProposingJobs.findAll();
    
    const allUser = await db.User.findAll({
        where:{
            educational_details_id: {
                [Op.not]: null
            }
        },
        include:[{
            model: db.BasicDetails
        },{
            model: db.EducationaDetails,
        },{
            model: db.AdditionalDetails,
            include:[{
                model: db.Accounts,
                where:{
                    gmail:{
                        [Op.not]: null
                    }
                }
            },{
                model: db.Position
            }]
        }]
    });
    
    const allJobOffer = await db.JobOffer.findAll({
        include:[{
            model: db.JobConditions
        },{
            model: db.Company
        }]
    });
    
    let prJobMap = new Map();
    for(let i in proposingJobs)
        if( prJobMap[proposingJobs[i].job_offer_id] == null )
            prJobMap[proposingJobs[i].job_offer_id].add(new Set());
    
    for(let i in proposingJobs)
        prJobMap[proposingJobs[i].job_offer_id].add(proposingJobs[i].user_id);
    
    for(let i in allUser){
        const userSkills = allUser[i].educational_detail.skills.split(',');
    
        const userSkillsSet = new Set();
        for(let i in userSkills) userSkillsSet.add(userSkills[i]);
    
        for(let j in allJobOffer){
            const jobSkills = allJobOffer[j].job_condition.skills.split(',');
    
            let flag = allUser[i].educational_detail.specialization != null && allUser[i].educational_detail.specialization === allJobOffer[j].job_condition.specialization;
    
            let flag2 = true;
            for(let k in jobSkills){
                if( !userSkillsSet.has(jobSkills[k]) ){
                    flag2 = false;
                }
                if( !flag2 ){
                    break;
                }
            }
    
            flag |= flag2;
            
            if( flag ){
                await transporter.sendMail({
                    from: "mril2021proj1@gmail.com",
                    to: allUser[i].additional_detail.account.gmail,
                    subject: "Jobless? New Job Offer For You!",
                    text: "Jobless? Suggest for you an new Job Offer😌\nCompany " + allJobOffer[j].company.name + " has a new Job Offer that fit your skills👌.\nIf you want the offer you can check the details inside the application.\nBy searching the title " + allJobOffer[j].job_condition.specialization,
                });

                await db.ProposingJobs.create({
                    "user_id": allUser[i].id,
                    "job_offer_id": allJobOffer[j].id
                });
            }
        }
    }
}