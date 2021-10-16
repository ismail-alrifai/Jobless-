
const admin = require('./firebase_conf');
const db    = require('../../database/myDB');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

exports.sendNotification = async (registrationToken,message) => {
    await admin.messaging().sendToDevice(registrationToken, message, notification_options);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getUserNotification = async(id) => {
    const allUser = await db.Notification.findAll({
        where:{
            user_id: id
        }
    });

    let response = [];
    for(let i = allUser.length - 1 ; i >= 0 ; i--){
        response.push({
            id              : allUser[i].id,
            title           : allUser[i].title,
            body            : allUser[i].body,
            is_read         : allUser[i].is_read,
            date_of_send    : allUser[i].date_of_send
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getfreelancerNotification = async(id) => {
    const allFreelancer = await db.Notification.findAll({
        where:{
            freelancer_id: id
        }
    });

    let response = [];
    for(let i = allFreelancer.length - 1 ; i >= 0 ; i--){
        response.push({
            id              : allFreelancer[i].id,
            title           : allFreelancer[i].title,
            body            : allFreelancer[i].body,
            is_read         : allFreelancer[i].is_read,
            date_of_send    : allFreelancer[i].date_of_send
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getCompanyNotification = async(id) => {
    const allCompany = await db.Notification.findAll({
        where:{
            company_id: id
        }
    });

    let response = [];
    for(let i = allCompany.length - 1 ; i >= 0 ; i--){
        response.push({
            id              : allCompany[i].id,
            title           : allCompany[i].title,
            body            : allCompany[i].body,
            is_read         : allCompany[i].is_read,
            date_of_send    : allCompany[i].date_of_send
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getAdminNotification = async(id) => {
    const allAdmin = await db.Notification.findAll({
        where:{
            admin_id: id
        }
    });

    let response = [];
    for(let i = allAdmin.length - 1 ; i >= 0 ; i--){
        response.push({
            id              : allAdmin[i].id,
            title           : allAdmin[i].title,
            body            : allAdmin[i].body,
            is_read         : allAdmin[i].is_read,
            date_of_send    : allAdmin[i].date_of_send
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getNotifications = async (req, res) => {
    const body = req.body;
    const {id ,type_of_account} = body;

    let response = [];
    if( type_of_account === "user")
        response = await this.getUserNotification(id);
    else if( type_of_account === "company")
        response = await this.getCompanyNotification(id);
    else if( type_of_account === "freelancer")
        response = await this.getfreelancerNotification(id);
    console.log(response);
    return res.status(302).send(response);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.changeRead = async (req,res) => {
    const body = req.body;
    const {id} = body;

    const notification = await db.Notification.findOne({
        where:{
            id: id
        }
    });

    notification.is_read = !notification.is_read;

    await notification.save();

    return res.sendStatus(200);
}