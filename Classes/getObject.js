/*
* This file has some BAAAAAD functions that return 
* full (Object) module  and take only the id of it
*/

const db = require('../database/myDB');

const EducationalDetailsObj = require('./EducationalDetails');
const EmploymentDetailsObj  = require('./EmploymentDetails');
const AdditionalDetailsObj  = require('./AdditionalDetails');
const PreviousWorksObj      = require('./PreviousWorks');
const JobConditionObj       = require('./JobCodition');
const BasicDetailsObj       = require('./BasicDetails');
const FrJobOfferObj         = require('./FrJobOffer');
const FreelancerOb          = require('./Freelancer');
const JobOfferObj           = require('./JobOffre');
const PositionObj           = require('./Position');
const AccountObj            = require('./Account');
const CompanyOb             = require('./Company');
const AdminOb               = require('./Admin');
const UserOb                = require('./User');
const rate                  = require('../Controllers/Methods/getRate');

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getCompanyObject = async id => {
    const company = await db.Company.findOne({
        where: {
            id: id
        },
        include:[{
                model: db.Accounts,
            },{
                model: db.Position,
        }]
    })

    const allUsers = await db.JobArchive.findOne({
        where: {
            company_id: id,
        }
    });
    
    const rateCompany = await rate.getRate(allUsers);

    return CompanyOb.get(
        await company,
        await PositionObj.get(company.position),
        await AccountObj.get(company.account),
        await rateCompany
    );
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getUserObject = async id => {
    const user = await db.User.findOne({
        where: {
            id: id
        },
        include:[{
            model: db.BasicDetails
        },{
            model: db.EducationaDetails
        },{
            model: db.AdditionalDetails,
            include:[{
                model: db.Accounts
            },{
                model: db.Position
            }]
        }]
    });

    let employmentDetails = await db.EmploymentDetails.findAll( {
        where: {
            user_id: id
        }
    });

    let empDetails = [];
    for(let i in employmentDetails){
        empDetails.push(EmploymentDetailsObj.get(employmentDetails[i]));
    }

    return UserOb.get(
        await user,
        await BasicDetailsObj.get(await user.basic_detail),
        await AdditionalDetailsObj.get(
            await user.additional_detail,
            await user.additional_detail == null ? null : AccountObj.get(user.additional_detail.account),
            await user.additional_detail == null ? null : PositionObj.get(user.additional_detail.position)
        ),
        await EducationalDetailsObj.get(user.educational_detail),
        empDetails
    );
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getFreelancerObject = async id => {
    const freelancer = await db.Freelancer.findOne({
        where:{
            id: id
        },
        include:[{
            model: db.BasicDetails
        },{
            model: db.EducationaDetails
        },{
            model: db.AdditionalDetails,
            include:[{
                model: db.Accounts
            },{
                model: db.Position
            }]
        }]
    });

    let previousWorks = await db.PreviousWorks.findAll( {
        where: {
            freelancer_id: id
        }
    });

    let prevWorks = [];
    for(let i in previousWorks){
        prevWorks.push(PreviousWorksObj.get(previousWorks[i]));
    }

    const allUsers = await db.FreelancerJobArchive.findAll({
        where: {
            freelancer_id: id,
        }
    });

    const rateFr = await rate.getRate(allUsers);

    return  FreelancerOb.get(
        await freelancer,
        await BasicDetailsObj.get(freelancer.basic_detail),
        await AdditionalDetailsObj.get(
            await freelancer.additional_detail,
            await freelancer.additional_detail == null ? null : AccountObj.get(freelancer.additional_detail.account),
            await freelancer.additional_detail == null ? null : PositionObj.get(freelancer.additional_detail.position)
        ),
        await EducationalDetailsObj.get(freelancer.educational_detail),
        prevWorks,
        rateFr
    );
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getAdminObject = async id => {
    const admin = await db.Admin.findOne({
        where: {
            id: id
        }
    });

    return AdminOb.get(await admin);
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getJobOfferObject = async id => {
    const jobOffer = await db.JobOffer.findOne({
        where: {
            id: id
        }
    });

    const company = await this.getCompanyObject(jobOffer.company_id);
    const jobConditions = jobOffer.job_condition_id == null ? null : await this.getJobCondition(jobOffer.job_condition_id);

    return JobOfferObj.get(jobOffer ,jobConditions ,company);
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getJobOfferBAAObject = async id => {
    const jobOfferBAA = await db.JobOfferAdminAccepter.findOne({
        where: {
            id: id
        }
    });

    const company = await this.getCompanyObject(jobOfferBAA.company_id);
    const jobConditions = jobOfferBAA.job_condition_id == null ? null : await this.getJobCondition(jobOfferBAA.job_condition_id);

    return JobOfferObj.get(await jobOfferBAA ,await jobConditions ,company);
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getFrJobOfferObject = async id => {
    const frJobOffer = await db.FreelanceJobOffer.findOne({
        where: {
            id: id
        }
    });

    const user = await this.getUserObject(frJobOffer.user_id);

    return FrJobOfferObj.get(frJobOffer ,user);
}

// ================================================================ //
// ================================================================ //
// ================================================================ //

exports.getJobCondition = async id => {
    const condition = await db.JobConditions.findOne({
        where:{
            id: id
        }
    });

    return JobConditionObj.get(condition);
}