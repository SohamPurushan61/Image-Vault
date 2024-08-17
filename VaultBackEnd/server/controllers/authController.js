const ethers = require("ethers")
const UserModel = require("../models/User")
const jwt = require("jsonwebtoken")
const {JWT_SECRETKEY} = require('../config/serverConfig')

async function authController(req,res,next){
    try {
        const {signature}=req.body;
        const {address}=req.query
        if(!signature) {
            throw new Error("Signature is invalid")
        }

        const recoveredAddress = ethers.verifyMessage("Welcome to Crypto Vault Website",signature)
        if(address.toLowerCase()===recoveredAddress.toLowerCase()){
            const address = recoveredAddress.toLowerCase();
            const user = await UserModel.findOne({userAddress:address})
            if(!user){
                const userData = await UserModel.create({userAddress:address})
                console.log(userData)
            }
            console.log('JWT_SECRETKEY:', process.env.JWT_SECRETKEY); // Debugging: Log the JWT_SECRETKEY value

            const token = jwt.sign({ address }, process.env.JWT_SECRETKEY);

            res.status(200).json({message:"Authentication successful", token})
        } else{
            status(400).json({message:"Authentication failed"})
        }

  } catch (error) {
    console.error(error);
    // Use error.message to access the error message
    res.status(500).json({message: error.message});
}
}

module.exports = {authController}