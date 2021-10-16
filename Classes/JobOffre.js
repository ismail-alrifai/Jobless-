// return Job offer module

exports.get = (job ,condition ,company) => {
    return {
        number_of_vacancies : job.number_of_vacancies,
        date_of_publication : job.date_of_publication,
        shift_time_of_job   : job.shift_time_of_job,
        duration_of_job     : job.duration_of_job,
        job_condition       : condition,
        description         : job.description,
        company             : company,
        salary              : job.salary,
        title               : job.title,
        image               : job.image,
        id                  : job.id
    };
}