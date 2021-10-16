const db = require('../myDB');

exports.Add = async (birthday ,hashedPassword ,firstName ,lastName ,gender ,email) => {
    return await db.BasicDetails.create({
        birthday_date   : birthday,
        password        : hashedPassword,
        first_name      : firstName,
        last_name       : lastName,
        gender          : gender,
        email           : email
    });
}