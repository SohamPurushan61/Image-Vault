const ethers = require("ethers")
const UserModel = require("../models/User")
const { PINATA_APIKEY,PINATA_SECRETKEY } = require('../config/serverConfig')
const {generateEncryptionKey} = require('../utils/generateKey')
const {encryptFile} = require('../utils/encryption')
const e = require("express")


async function uploadImageController(req,res,next){
    try {

        const address = req.address;
        const userAddress = address.toLowerCase();
        const user = await UserModel.findOne({userAddress: userAddress});

        if (!user) {
            throw new Error("User not found");
        }

        if (user.encryptionKey === null) {
            const encryptionKey = generateEncryptionKey(32);
            user.encryptionKey = encryptionKey;
            await user.save();
        }

        const { encryptedData, iv } = encryptFile(req.file.buffer, user.encryptionKey);
        console.log(encryptedData)
        
        console.log(req.file)
        // Use the api keys by specifying your api key and api secret
    const pinataSDK = require('@pinata/sdk');
    const pinata = new pinataSDK({ pinataApiKey: PINATA_APIKEY, pinataSecretApiKey: PINATA_SECRETKEY });
        const resPinata = await pinata.pinJSONToIPFS({encryptedData, iv});

        res.status(200).json({ipfsHash: resPinata.IpfsHash, message:"Image uploaded successfully"})
    } catch (error) {

        console.log(error);
        res.status(500).json({message:"Internal server error"})

    }
}

module.exports = {uploadImageController}