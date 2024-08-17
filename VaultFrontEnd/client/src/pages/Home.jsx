import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/GetImage";


const Home = () => {
//  const { web3state } = useWeb3Context();
  //  const { selectedAccount } = web3state; // Corrected typo here
   // console.log(selectedAccount)

    return ( <div>

        <UploadImage/>
        <GetImage/>
    </div> );
}
 
export default Home;