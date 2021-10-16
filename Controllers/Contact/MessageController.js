const db            = require('../../database/myDB');
const Sequelize     = require('sequelize');
const getObject     = require('../../Classes/getObject');
const AddMessage    = require('../../database/Methods/AddMessage');
const notification  = require('../Contact/NotificationsController');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.sendMessage = async (req ,res) => {
    const reqBody = req.body;

    const {title ,body ,from_user_id ,from_freelancer_id ,from_company_id ,to_user_id ,to_freelancer_id ,to_company_id} = reqBody;

    if( to_user_id != null ){
        const user = await db.User.findOne({
            where:{
                id: to_user_id
            }
        });
        if( user == null ){
            return res.sendStatus(404);
        }
    }
    else if( to_freelancer_id != null ){
        const freelancer= await db.Freelancer.findOne({
            where:{
                id: to_freelancer_id
            }
        });
        if( freelancer == null ){
            return res.sendStatus(404);
        }
    }
    else if( to_company_id != null ){
        const company= await db.Company.findOne({
            where:{
                id: to_company_id
            }
        });
        if( company == null ){
            return res.sendStatus(404);
        }
    }
    else{
        return res.sendStatus(404);
    }

    await AddMessage.Add(title ,body ,new Date() ,from_user_id ,from_freelancer_id ,from_company_id ,to_user_id ,to_freelancer_id ,to_company_id);

    return res.sendStatus(201);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getUserMessage = async (id) => {
    const allMessage = await db.Message.findAll({
        where: Sequelize.or({
                from_user_id: id
            },{
                to_user_id: id
        })
    });

    const user = await getObject.getUserObject(id);

    let response = [];
    for(let i = allMessage.length-1 ; i >= 0 ; i-- ) {
        let company = null;
        let freelancer = null;

        let name = null;
        let toEmail = null;
        let fromEmail = null;

        if( allMessage[i].from_freelancer_id != null ) {
            freelancer = await getObject.getFreelancerObject(allMessage[i].from_freelancer_id);
            fromEmail = freelancer.basic_detail.email;
            name = freelancer.basic_detail.first_name + ' ' + freelancer.basic_detail.last_name;
        }
        else if( allMessage[i].to_freelancer_id != null ) {
            freelancer = await getObject.getFreelancerObject(allMessage[i].to_freelancer_id);
            toEmail = freelancer.basic_detail.email;
            name = user.basic_detail.first_name + ' ' + user.basic_detail.last_name;
        }
        else if( allMessage[i].from_company_id != null ) {
            company = await getObject.getCompanyObject(allMessage[i].from_company_id);
            fromEmail = company.email;
            name = company.name;
        }
        else if( allMessage[i].to_company_id != null ) {
            company = await getObject.getCompanyObject(allMessage[i].to_company_id);
            toEmail = company.email;
            name = user.basic_detail.first_name + ' ' + user.basic_detail.last_name;
        }

        await response.push({
            id              : allMessage[i].id,
            title           : allMessage[i].title,
            body            : allMessage[i].body,
            date_of_send    : allMessage[i].date_of_send,
            is_read         : allMessage[i].is_read,
            from_user_id    : allMessage[i].from_user_id,
            from_freelancer_id : allMessage[i].from_freelancer_id,
            from_company_id : allMessage[i].from_company_id,
            to_user_id      : allMessage[i].to_user_id,
            to_freelancer_id: allMessage[i].to_freelancer_id,
            to_company_id   : allMessage[i].to_company_id,

            name: name,
            toEmail: toEmail,
            fromEmail: fromEmail
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getFreelancerMessage = async (id) => {
    const allMessage = await db.Message.findAll({
        where: Sequelize.or({
            from_freelancer_id: id,
        },{
            to_freelancer_id: id
        })
    });

    const freelancer = await getObject.getFreelancerObject(id);

    let response = [];
    for(let i = allMessage.length-1 ; i >= 0 ; i--) {
        let user = null;
        let name = null;
        let toEmail = null;
        let fromEmail = null;

        if( allMessage[i].from_user_id != null ) {
            user = await getObject.getUserObject(allMessage[i].from_user_id);
            fromEmail = user.basic_detail.email;
            name = user.basic_detail.first_name + ' ' + user.basic_detail.last_name;
        }
        else if( allMessage[i].to_user_id != null ) {
            user = await getObject.getUserObject(allMessage[i].to_user_id);
            toEmail = user.basic_detail.email;
            name = freelancer.basic_detail.first_name + ' ' + freelancer.basic_detail.last_name;
        }

        await response.push({
            id              : allMessage[i].id,
            title           : allMessage[i].title,
            body            : allMessage[i].body,
            date_of_send    : allMessage[i].date_of_send,
            is_read         : allMessage[i].is_read,
            from_user_id    : allMessage[i].from_user_id,
            from_freelancer_id : allMessage[i].from_freelancer_id,
            from_company_id : allMessage[i].from_company_id,
            to_user_id      : allMessage[i].to_user_id,
            to_freelancer_id: allMessage[i].to_freelancer_id,
            to_company_id   : allMessage[i].to_company_id,

            name : name,
            toEmail: toEmail,
            fromEmail: fromEmail
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getCompanyMessage = async (id) => {
    const allMessage = await db.Message.findAll({
        where: Sequelize.or({
            from_company_id: id,
        },{
            to_company_id: id
        })
    });

    const company = await getObject.getCompanyObject(id);

    let response = [];
    for(let i = allMessage.length-1 ; i >= 0 ; i--) {
        let user = null;
        let name = null;
        let fromEmail = null;
        let toEmail = null;

        if( allMessage[i].from_user_id != null ) {
            user = await getObject.getUserObject(allMessage[i].from_user_id);
            fromEmail = user.basic_detail.email;
            name = user.basic_detail.first_name + ' ' + user.basic_detail.last_name;
        }
        else if( allMessage[i].to_user_id != null ) {
            user = await getObject.getUserObject(allMessage[i].to_user_id);
            toEmail = user.basic_detail.email;
            name = company.name;
        }

        await response.push({
            id              : allMessage[i].id,
            title           : allMessage[i].title,
            body            : allMessage[i].body,
            date_of_send    : allMessage[i].date_of_send,
            is_read         : allMessage[i].is_read,
            from_user_id    : allMessage[i].from_user_id,
            from_freelancer_id : allMessage[i].from_freelancer_id,
            from_company_id : allMessage[i].from_company_id,
            to_user_id      : allMessage[i].to_user_id,
            to_freelancer_id: allMessage[i].to_freelancer_id,
            to_company_id   : allMessage[i].to_company_id,

            name : name,
            toEmail: toEmail,
            fromEmail: fromEmail
        });
    }

    return response;
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.getAllMessages = async (req ,res) => {
    const body = req.body;

    const {id ,type_of_account} = body;

    let response = [];
    if( type_of_account === "user" ){
        response = await this.getUserMessage(id);
    } else if( type_of_account === "freelancer" ) {
        response = await this.getFreelancerMessage(id);
    } else if( type_of_account === "company" ) {
        response = await this.getCompanyMessage(id);
    }

    return res.status(302).json(response);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.changeRead = async (req,res) => {
    const body = req.body;
    const {id} = body;

    const message = await db.Message.findOne({
        where:{
            id: id
        }
    });

    message.is_read = !message.is_read;
    await message.save();

    return res.sendStatus(200);
}

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.newMessage = async (req ,res ,next) => {
    const email = req.body.email;
    const from_user_id = req.body.from_user_id;
    const from_company_id = req.body.from_company_id;
    const from_freelancer_id = req.body.from_freelancer_id;

    req.body.to_freelancer_id = null;
    req.body.to_company_id = null;
    req.body.to_user_id = null

    if( from_company_id != null || from_freelancer_id != null) {
        let user = await db.User.findOne({
            include: {
                model: db.BasicDetails,
                where:{
                    email: email
                }
            }
        });

        if( user != null ) {
            req.body.to_user_id = user.id;
            const message = {
                notification: {
                    title: "New Message!!",
                    body: "Check your inbox!📩."
                }
            };
            if( user.registration_token != null ) await notification.sendNotification(user.registration_token, message);
            
            await db.Notification.create({
                title: message.notification.title,
                body: message.notification.body,
                date_of_send: new Date(),
                is_read: false,
                user_id: user.id
            });
        
        }
    }
    if( from_user_id != null ){
        let freelancer = await db.Freelancer.findOne({
            include: {
                model: db.BasicDetails,
                where:{
                    email: email
                }
            }
        });

        if( freelancer != null ){
            req.body.to_freelancer_id = freelancer.id;
            const message = {
                notification: {
                    title: "New Message!!",
                    body: "Check your inbox!📩."
                }
            };

            if( freelancer.registration_token != null ) await notification.sendNotification(freelancer.registration_token, message);
            
            await db.Notification.create({
                title: message.notification.title,
                body: message.notification.body,
                date_of_send: new Date(),
                is_read: false,
                freelancer_id: freelancer.id
            });
        }
        else{
            let company = await db.Company.findOne({
                where:{
                    email: email
                }
            });

            if( company != null ){
                req.body.to_company_id = company.id;

                const message = {
                    notification: {
                        title: "New Message!!",
                        body: "Check your inbox!📩."
                    }
                };

                if( company.registration_token != null ) await notification.sendNotification(company.registration_token, message);

                await db.Notification.create({
                    title: message.notification.title,
                    body: message.notification.body,
                    date_of_send: new Date(),
                    is_read: false,
                    company_id: company.id
                });
            }
        }
    }

    if( req.body.to_freelancer_id == null && req.body.to_company_id == null && req.body.to_user_id == null ) {
        return res.sendStatus(404);
    }

    next();
}