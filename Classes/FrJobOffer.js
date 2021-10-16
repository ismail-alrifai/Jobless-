// return Frelance Job Offer module

exports.get = (frJob ,user) => {
    return {
        date_of_publication : frJob.date_of_publication,
        description         : frJob.description,
        deadline            : frJob.deadline,
        skills              : frJob.skills,
        title               : frJob.title,
        image               : frJob.image,
        wage                : frJob.wage,
        user                : user,
        id                  : frJob.id
    };
}