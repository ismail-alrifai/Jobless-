const db = require('../myDB');

exports.Add = async (c_v ,skills ,courses ,graduate ,languages_known ,specialization ,education) => {
    return await db.EducationaDetails.create({
        languages_known : languages_known,
        specialization  : specialization,
        education       : education,
        graduate        : graduate,
        courses         : courses,
        skills          : skills,
        c_v             : c_v
    });
}