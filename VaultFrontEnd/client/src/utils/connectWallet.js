import {ethers, Contract } from "ethers"
import contractAbi from "../constants/contractAbi.json"
import toast from "react-hot-toast"
import axios from "axios"
export const connectWallet = async() => {
    try {
        if(!window.ethereum) {
            throw new Error("Metamask is not installed")
        }

        const accounts =await window.ethereum.request({
            method:"eth_requestAccounts"
        
        })

        const message = "Welcome to Crypto Vault Website";
        console.log(`Message: ${message}`);
        
        const selectedAccount = accounts[0];
        console.log(`Selected account: ${selectedAccount}`);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        const signature = await signer.signMessage(message);
        console.log(`Signature: ${signature}`);
        
        const dataSignature = { signature };
        console.log(`Data signature: ${JSON.stringify(dataSignature)}`);

    const url= `http://localhost:3000/api/authentication?address=${selectedAccount}`
    const res = await axios.post(url, dataSignature)

        const token = res.data.token;
        localStorage.setItem("token", token);

        const contractAddress = "0xcd1ff7c79a54697B58DdCfE0D2db725B4e5f6D60"
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        return {contractInstance, selectedAccount}
    }
    catch (error) {
        toast.error("Wallet Connection Failed")
        console.error(error)
        return{}
    }

}