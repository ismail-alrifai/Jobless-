const db = require('../myDB');

exports.Add = async (firstName ,lastName ,email ,password ,dateCreation) => {
    return await db.Admin.create({
        date_of_account_creation: dateCreation,
        first_name              : firstName,
        last_name               : lastName,
        password                : password,
        email                   : email
    });
}