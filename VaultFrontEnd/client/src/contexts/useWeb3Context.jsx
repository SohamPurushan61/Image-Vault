import { Web3Context } from "./createWeb3Context";
import { useContext } from "react";

// This is a custom hook that allows us to use the Web3Context in our components
export const useWeb3Context = () => {
  return useContext(Web3Context);
}
