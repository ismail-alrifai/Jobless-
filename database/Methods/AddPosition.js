const db = require('../myDB');

exports.Add = async (latitude ,longitude ,country ,city) => {
    return await db.Position.create({
        longitude   : longitude,
        latitude    : latitude,
        country     : country,
        city        : city
    });
}