const db = require('../../database/myDB');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getAllCountries = async (req ,res) => {
    const countries = await db.Country.findAll({});

    let response = new Map();
    for(let i in countries){
        response[countries[i].country] = await db.City.findAll({
            where: {
                country_id: countries[i].id
            }
        });
    }

    return res.status(302).send(response);
}