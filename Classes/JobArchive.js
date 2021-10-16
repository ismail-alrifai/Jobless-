exports.get = (archive ,company ,user) => {
    return {
        id : archive.id,
        title : archive.title,
        description : archive.description,
        salary : archive.salary,
        duration_of_job : archive.duration_of_job,
        shift_time_of_job : archive.shift_time_of_job,
        educational_level : archive.education_level,
        specialization : archive.specialization,
        skills : archive.skills,
        year_of_experience : archive.year_of_experience,
        rate : archive.rate,
        company : company,
        user : user
    }
}