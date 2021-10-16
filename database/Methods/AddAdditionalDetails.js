const db = require('../myDB');

exports.Add = async (image ,creditCardNumber ,nationality ,account_id ,position_id) => {
    return await db.AdditionalDetails.create({
        credit_card_number  : creditCardNumber,
        nationality         : nationality,
        position_id         : position_id,
        account_id          : account_id,
        image               : image
    });
}