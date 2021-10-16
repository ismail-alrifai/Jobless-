const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config    = require('../jwt/config.json');
const getObject = require('../Classes/getObject');
const db        = require('../database/myDB');

/// ===================================================================== ///
/// ===================================================================== ///
/// ===================================================================== ///

exports.postLoginByEmail = async (req ,res) => {
    const body = req.body;

    const {email ,password} = body;

    const basicDetail = await db.BasicDetails.findOne({
        where:{
            email: email
        }
    });
    const company = await db.Company.findOne({
        where:{
            email: email
        }
    });
    const admin = await db.Admin.findOne({
        where:{
            email: email
        }
    });

    if( admin != null ){
        if( await checkPassword(password ,admin.password) ){
            
            /// --- create token --- ///
            const token = await jwt.sign({ sub: email } ,config.secret ,{ expiresIn: '1d' });
            
            /// --- get full object --- ///
            const object = await getObject.getAdminObject(admin.id);
            
            // --- send json contain token and admin itself --- /// 
            return res.status(200).json({token: token ,object: object  ,type_of_account: 3});
        }
    }

    if( company != null ){
        if( await checkPassword(password ,company.password) ){
            
            /// --- create token --- ///
            const token = await jwt.sign({ sub: email } ,config.secret ,{ expiresIn: '1d' });
            
            /// --- get full object --- ///
            const object = await getObject.getCompanyObject(company.id);
            
            // --- send json contain token and company itself --- /// 
            return res.status(200).json({token: token ,object: object ,type_of_account: 2});
        }
    }

    if( basicDetail != null ){
        const freelancer = await db.Freelancer.findOne({
            where:{
                basic_details_id: basicDetail.id
            }
        });
        const user = await db.User.findOne({
            where:{
                basic_details_id: basicDetail.id
            }
        });

        if( await checkPassword(password ,basicDetail.password) ){

            /// --- create token --- ///
            const token = await jwt.sign({ sub: email } ,config.secret ,{ expiresIn: '1d' });

            /// --- get full object --- ///
            if( freelancer != null ){
                // --- send json contain token and freelancer itself --- ///
                const object = await getObject.getFreelancerObject(freelancer.id);
                return res.status(200).json({token: token ,object: object ,type_of_account: 1});
            }
            else if( user != null ){
                // --- send json contain token and user itself --- ///
                const object = await getObject.getUserObject(user.id);
                return res.status(200).json({token: token ,object: object ,type_of_account: 4});
            }
        }
    }

    // email not found or incorrect password
    return res.status(403).send("Your Email or Password is incorrect!!");
}

/// ===================================================================== ///
/// ===================================================================== ///
/// ===================================================================== ///

exports.postLoginByLoginId = async (req ,res) => {
    const body = req.body;

    const loginId  = body["login_id"];
    const password = body["password"];

    const loginIdObject = await db.LoginId.findOne({
        where:{
            id: loginId
        }
    });

    if( loginIdObject != null ){
        if( loginIdObject.freelancer_id != null ){
            const freelancer = await db.Freelancer.findOne({
                where:{
                    id: loginIdObject.freelancer_id
                }
            });
            const basicDetail = await db.BasicDetails.findOne({
                where:{
                    id: freelancer.basic_details_id
                }
            });

            if( await checkPassword(password ,basicDetail.password) ){

                /// --- create token --- ///
                const token = await jwt.sign({ sub: basicDetail.email } ,config.secret ,{ expiresIn: '1d' });

                /// --- get full object --- ///
                const object = await getObject.getFreelancerObject(freelancer.id);

                // --- send json contain token and freelancer itself --- ///
                return res.status(200).json({token: token ,object: object ,type_of_account: 1});
            }
        }

        if( loginIdObject.company_id != null ){
            const company = await db.Company.findOne({
                where:{
                    id: loginIdObject.company_id
                }
            });

            if( await checkPassword(password ,company.password) ){

                /// --- create token --- ///
                const token = await jwt.sign({ sub: company.email } ,config.secret ,{ expiresIn: '1d' });

                /// --- get full object --- ///
                const object = await getObject.getCompanyObject(company.id);

                // --- send json contain token and company itself --- ///
                return res.status(200).json({token: token ,object: object ,type_of_account: 2});
            }
        }

        if( loginIdObject.admin_id != null ){
            const admin = await db.Admin.findOne({
                where:{
                    id: loginIdObject.admin_id
                }
            });

            if( await checkPassword(password ,admin.password) ){

                /// --- create token --- ///
                const token = await jwt.sign({ sub: admin.email } ,config.secret ,{ expiresIn: '1d' });

                /// --- get full object --- ///
                const object = await getObject.getAdminObject(admin.id);

                // --- send json contain token and admin itself --- ///
                return res.status(200).json({token: token ,object: object ,type_of_account: 3});
            }
        }

        if( loginIdObject.user_id != null ){
            const user = await db.User.findOne({
                where:{
                    id: loginIdObject.user_id
                }
            });
            const basicDetail = await db.BasicDetails.findOne({
                where:{
                    id: user.basic_details_id
                }
            });

            if( await checkPassword(password ,basicDetail.password) ){

                /// --- create token --- ///
                const token = await jwt.sign({ sub: basicDetail.email } ,config.secret ,{ expiresIn: '1d' });

                /// --- get full object --- ///
                const object = await getObject.getUserObject(user.id);

                // --- send json contain token and user itself --- ///
                return res.status(200).json({token: token ,object: object ,type_of_account: 4});
            }
        }
    }

    // email not found or incorrect password
    return res.status(403).send("Your Email or Password is incorrect!!");
}

/// ===================================================================== ///
/// ===================================================================== ///
/// ===================================================================== ///

async function checkPassword(expectedPassword ,realPassword){
    return await bcrypt.compare(expectedPassword ,realPassword);
}

/// ===================================================================== ///
/// ===================================================================== ///
/// ===================================================================== ///