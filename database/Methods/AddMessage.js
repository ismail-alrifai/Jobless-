const db = require('../myDB');

exports.Add = async (title ,body ,date_of_send ,from_user_id ,from_freelancer_id ,from_company_id ,to_user_id ,to_freelancer_id ,to_company_id) => {
    return await db.Message.create({
        from_freelancer_id  : from_freelancer_id,
        to_freelancer_id    : to_freelancer_id,
        from_company_id     : from_company_id,
        to_company_id       : to_company_id,
        from_user_id        : from_user_id,
        date_of_send        : date_of_send,
        to_user_id          : to_user_id,
        is_read             : false,
        title               : title,
        body                : body
    });
}