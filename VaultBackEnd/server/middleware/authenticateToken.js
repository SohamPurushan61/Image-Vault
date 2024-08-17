const jwt = require('jsonwebtoken')
const { JWT_SECRETKEY } = require('../config/serverConfig')

async function authenticateToken(req,res,next){
    try {

        const token = req.headers['x-access-token']
        if(!token){

            throw new Error("Token is missing")

        }
        const decoded = jwt.verify(token,JWT_SECRETKEY)
        req.address=decoded.address;
        next()
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
    
}

module.exports = {authenticateToken}