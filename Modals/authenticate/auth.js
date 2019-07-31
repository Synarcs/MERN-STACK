const jwt = require('jsonwebtoken');
const config = require('config')
const user = require('../schemas/users');


async function auth(req,res,next){
    // get the token from front end 
    try{
        const token = req.header('x-auth-token');
        if(!token){
            throw new Error();
        }
        const ver = await jwt.verify(token,config.get('jwtSecret'));
        // take user from token return req.user
        req.user = ver.id
        next();
    }catch(e){
        res.status(401).send('you are unauthorized');
    }
}

module.exports = auth;