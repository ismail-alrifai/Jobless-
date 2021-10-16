
exports.get = (educational_details) => {
    return educational_details != null ? {
        id              : educational_details.id,
        education       : educational_details.education,
        specialization  : educational_details.specialization,
        languages_known : educational_details.languages_known,
        graduate        : educational_details.graduate,
        courses         : educational_details.courses,
        skills          : educational_details.skills,
        c_v             : educational_details.c_v
    } : null;
}