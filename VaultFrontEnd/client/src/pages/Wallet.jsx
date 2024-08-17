import {useWeb3Context} from "../contexts/useWeb3Context";
import { connectWallet } from "../utils/connectWallet";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";  

const Wallet = () => {
    const navigateTo = useNavigate();
    const { updateWeb3State, web3state } = useWeb3Context();
    const selectedAccount = web3state ? web3state.selectedAccount : null;

    console.log(web3state, updateWeb3State); // Correct variable name

    useEffect(() => {
        console.log(web3state);
    }, [web3state]);

    useEffect(() => {
        console.log(`useEffect triggered with selectedAccount ${selectedAccount}`);
        if (selectedAccount) {
            console.log(`Navigating to /Home because selectedAccount is ${selectedAccount}`);
            navigateTo("/home");
        }
    }, [selectedAccount, navigateTo]);

    useEffect(() => {
        console.log('Wallet component rendered');
    }, []);



    const handleWalletConnection = async () => {
        console.log('Connecting wallet...');
        const result = await connectWallet();
        if (result) {
            const { contractInstance, selectedAccount } = result;
            console.log(`Wallet connected with selectedAccount ${selectedAccount}`);
            updateWeb3State({ contractInstance, selectedAccount });
            console.log(`updated state with selectedAccount ${selectedAccount}`);
            console.log(web3state); // Log the web3state after updating it
           // navigateTo("/home"); // Navigate to /home directly after updating the state

        }
    }
    return ( 
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] flex flex-col justify-center items-center gap-20">
          <h1 className="font-bold text-[42px] gradient-text md:text-[60px]">
            Crypted Vault
          </h1>
          <button
            className="relative px-12 py-4 text-white bg-sky-400 rounded-md hover:bg-sky-800 font-semibold"
            onClick={handleWalletConnection}
          >
            Connect Wallet
          </button>
        </div>
      </div> );
    }
export default Wallet;