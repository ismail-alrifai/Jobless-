const jwt    = require('jsonwebtoken');
const config = require('../jwt/config.json');

// ------------------------------------ //
// ------------------------------------ //
// ------------------------------------ //

exports.checkToken = async (req ,res ,next) => {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    
    if( token == null ) return res.sendStatus(401);
    
    jwt.verify(token ,config.secret ,(err ,payload) => {
        if( err ) return res.sendStatus(403);

        req.body.email = payload.email;
        next();
    });
}