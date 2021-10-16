const db = require('../myDB');

exports.addCompanyLoginID = async companyID => {
    return await db.LoginId.create({
        company_id: companyID,
    });
}

exports.addUserLoginID = async userId => {
    return await db.LoginId.create({
        user_id: userId,
    });
}

exports.addFreelancerLoginID = async freelancerId => {
    return await db.LoginId.create({
        freelancer_id: freelancerId,
    });
}

exports.addAdminLoginID = async adminId => {
    return await db.LoginId.create({
        admin_id: adminId
    });
}