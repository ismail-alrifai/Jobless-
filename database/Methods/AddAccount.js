const db = require('../myDB');

exports.Add = async (twitter ,instagram ,linkedin ,gmail ,facebook ,telegram) => {
    return await db.Accounts.create({
        instagram   : instagram,
        linkedin    : linkedin,
        facebook    : facebook,
        telegram    : telegram,
        twitter     : twitter,
        gmail       : gmail
    });
}