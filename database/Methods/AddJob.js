const db = require('../myDB');

// =========================================== //
// =========================================== //
// =========================================== //

exports.addJobCondition = async JobConditions => {
    return await db.JobConditions.create({
        years_of_experience : JobConditions["years_of_experience"],
        education_level     : JobConditions["education_level"],
        specialization      : JobConditions["specialization"],
        nationality         : JobConditions["nationality"],
        languages           : JobConditions["languages"],
        country             : JobConditions["country"],
        gender              : JobConditions["gender"],
        skills              : JobConditions["skills"],
        age                 : JobConditions["age"],
    });
}

// =========================================== //
// =========================================== //
// =========================================== //

exports.addJojOffer = async (company_id ,date_of_publication ,title ,description ,image ,
                                          salary ,duration_of_job ,shift_time_of_job,
                                          number_of_vacancies ,job_condition_id) => {
    return await db.JobOffer.create({
        number_of_vacancies : number_of_vacancies,
        date_of_publication : date_of_publication,
        shift_time_of_job   : shift_time_of_job,
        job_condition_id    : job_condition_id,
        duration_of_job     : duration_of_job,
        description         : description,
        company_id          : company_id,
        salary              : salary,
        title               : title,
        image               : image
    });
}

// =========================================== //
// =========================================== //
// =========================================== //

exports.addJobOfferAdminAccepter = async (company_id ,date_of_publication ,title ,description ,image ,
                                          salary ,duration_of_job ,shift_time_of_job,
                                          number_of_vacancies ,job_condition_id) => {
    return await db.JobOfferAdminAccepter.create({
        date_of_publication : date_of_publication,
        number_of_vacancies : number_of_vacancies,
        shift_time_of_job   : shift_time_of_job,
        job_condition_id    : job_condition_id,
        duration_of_job     : duration_of_job,
        description         : description,
        company_id          : company_id,
        salary              : salary,
        title               : title,
        image               : image
    });
}

// =========================================== //
// =========================================== //
// =========================================== //

exports.addJobOfferArchive = async (user_id ,jobOffer ,jobCondition) => {
    return await db.JobArchive.create({
        user_id             : user_id,
        shift_time_of_job   : jobOffer["shift_time_of_job"],
        duration_of_job     : jobOffer["duration_of_job"],
        description         : jobOffer["description"],
        company_id          : jobOffer["company_id"],
        salary              : jobOffer["salary"],
        title               : jobOffer["title"],
        year_of_experience  : jobCondition == null ? null : jobCondition["years_of_experience"],
        educational_level   : jobCondition == null ? null : jobCondition["education_level"],
        specialization      : jobCondition == null ? null : jobCondition["specialization"],
        skills              : jobCondition == null ? null : jobCondition["skills"]
    });
}

// =========================================== //
// =========================================== //
// =========================================== //