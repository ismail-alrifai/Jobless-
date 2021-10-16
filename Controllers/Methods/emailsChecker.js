const db  = require('../../database/myDB');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.Check = async input => {
    /// --- Search If The Email Is Exist In Any Of Tables --- ///

    const company = await db.Company.findOne({
        where: {
            email: input
        }
    });

    if( company == null ) {
        const basicDetail = await db.BasicDetails.findOne({
            where: {
                email: input
            }
        });

        if( basicDetail == null ) {
            const admin = await db.Admin.findOne({
                where: {
                    email: input
                }
            });
            
            if( admin == null ){
                const companyBeforAccept = await db.CompanySignupAdminAccepter.findOne({
                    where:{
                        email: input
                    }
                });

                if( companyBeforAccept == null ) return false;
            }
        }
    }
    
    return true;
}
