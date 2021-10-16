const db = require('../myDB');

exports.Add = async (date_of_start ,date_of_end ,title ,city ,country ,details ,user_id) => {
    return await db.EmploymentDetails.create({
        date_of_start   : date_of_start,
        date_of_end     : date_of_end,
        country         : country,
        details         : details,
        user_id         : user_id,
        title           : title,
        city            : city
    });
}