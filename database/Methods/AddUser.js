const db = require('../myDB');

exports.Add = async (date_of_account_creation ,basicDetailId ,additionalDetailId ,educationalDetailId) => {
    return await db.User.create({
        date_of_account_creation    : date_of_account_creation,
        educational_details_id      : educationalDetailId,
        additional_details_id       : additionalDetailId,
        basic_details_id            : basicDetailId
    });
}