const db = require('../myDB');

exports.Add = async (link ,freelancer_id) => {
    return await db.PreviousWorks.create({
        freelancer_id   : freelancer_id,
        link            : link,
    });
}