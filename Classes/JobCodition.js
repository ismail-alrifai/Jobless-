exports.get = (jobCodition) => {
    return jobCodition != null ? {
        years_of_experience : jobCodition.years_of_experience,
        education_level     : jobCodition.education_level,
        specialization      : jobCodition.specialization,
        nationality         : jobCodition.nationality,
        languages           : jobCodition.languages,
        country             : jobCodition.country,
        gender              : jobCodition.gender,
        skills              : jobCodition.skills,
        age                 : jobCodition.age,
        id                  : jobCodition.id
    } : jobCodition
}