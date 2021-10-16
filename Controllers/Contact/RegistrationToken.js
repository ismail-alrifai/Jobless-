const db = require('../../database/myDB');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.addRegistrationToken = async (req ,res) => {
    const body = req.body;

    const {email ,registration_token} = body;

    const company = await db.Company.findOne({
        where: {
            email: email
        }
    });
    if( company == null ){
        const user = await db.User.findOne({
            include : {
                model : db.BasicDetails,
                where: {
                    email : email
                }
            }
        });
        if( user == null ){
            const freelancer = await db.Freelancer.findOne({
                include : {
                    model : db.BasicDetails,
                    where: {
                        email : email
                    }
                }
            });
            if( freelancer == null ){
                return res.sendStatus(404);
            }
            else{
                freelancer.registration_token = registration_token;
                await freelancer.save();
            }
        }
        else{
            user.registration_token = registration_token;
            await user.save();
        }
    }
    else{
        company.registration_token = registration_token;
        await company.save();
    }

    return res.sendStatus(201);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.deleteRegistrationToken = async (req ,res) => {
    const body = req.body;

    const {email} = body;

    const company = await db.Company.findOne({
        where: {
            email: email
        }
    });
    if( company == null ){
        const user = await db.User.findOne({
            include : {
                model : db.BasicDetails,
                where: {
                    email : email
                }
            }
        });
        if( user == null ){
            const freelancer = await db.Freelancer.findOne({
                include : {
                    model : db.BasicDetails,
                    where: {
                        email : email
                    }
                }
            });
            if( freelancer == null ){
                return res.sendStatus(404);
            }
            else{
                freelancer.registration_token = null;
                await freelancer.save();
            }
        }
        else{
            user.registration_token = null;
            await user.save();
        }
    }
    else{
        company.registration_token = null;
        await company.save();
    }

    return res.sendStatus(200);
}

/// ------------------------------------ ///
/// ------------------------------------ ///
