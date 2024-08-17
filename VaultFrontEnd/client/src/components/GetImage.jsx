import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";

const GetImage = ({ reload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);

  const { web3state } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3state;

  useEffect(() => {
    const getImageHashes = async () => {
      const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
      return ipfsHashes;
    };

    const getImage = async () => {
      const ipfsHashes = await getImageHashes();
      const ipfsHashArray = Object.values(ipfsHashes);

      const url = `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`;
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "x-access-token": token,
        },
      };
      const res = await axios.post(url, ipfsHashArray, config);
      const imagesData = res.data.depcryptedImageArr;
      setImages(imagesData);
    };

    if (contractInstance) {
      getImage();
    }
  }, [contractInstance, currentPage, imagePerPage, selectedAccount]);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {images.length > 0 ? (
        images.map((imgData, index) => (
          <img key={index} src={`data:image/jpeg;base64,${imgData}`} alt="Blockchain Image"></img>
        ))
      ) : (
        <p>No Images Found</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={() => pagination(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={() => pagination(currentPage + 1)}>Next</button>
      </div>
    </>
  );
}

export default GetImage;