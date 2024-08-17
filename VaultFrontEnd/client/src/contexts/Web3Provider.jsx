import { Web3Context } from "./createWeb3Context";
import { useState } from "react";


const Web3Provider = ({ children }) => {

    const [web3state, setWeb3State] = useState({
        contractInstance: null,
        selectedAccount: null,

    })
     
    const updateWeb3State = (newState) => {
        setWeb3State(prevState => ({
            ...prevState,
            ...newState
        }))
    }
        
    return (
        <Web3Context.Provider value={{web3state, updateWeb3State}}>
            {children}
        </Web3Context.Provider>);
}

export default Web3Provider;

