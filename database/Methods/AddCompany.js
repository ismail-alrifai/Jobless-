const db = require('../myDB');

exports.Add = async (dateCreation ,hashedPassword ,email ,name) => {
    return await db.Company.create({
        date_of_account_creation    : dateCreation,
        password                    : hashedPassword,
        email                       : email,
        name                        : name
    });
}