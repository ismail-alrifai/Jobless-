const db = require('../myDB');

exports.Add = async (name ,email ,password) => {
    return await db.CompanySignupAdminAccepter.create({
        password : password,
        email    : email,
        name     : name,
    });
}