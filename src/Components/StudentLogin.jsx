import { ethers } from "ethers";
import React, { useState } from "react";

function StudentLogin() {
  const [message, setMessage] = useState("");
  const [contract, setContract] = useState(null);

  //owner contract to auth student
  const contractAddress = "";
  const contractABI = [];

  //student contract to fetch cid
  const contractAddress2 = "";
  const contractABI2 = [];

  const authenticateUser = async (value) => {
    if (!window.ethereum) {
      setMessage("Metamask not installed");
      return;
    }
    try {
      // requesting metamask connection
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
    } catch (err) {
      setMessage("Error connecting wallet");
      console.log(err.message);
    }

    const studentDetails = await contract.authStudents(value);
    if (studentDetails.isRegistered) {
      message("Student already registered!");
      return;
    }
  };

// contract2.fetchcid arr
// funstion to call contract2 (student) for fetching a random cid
    async function fetchJsonFromPinata(cid) {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}`);
        const data = await response.json();
        return data;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.form.elements[0].value;
    authenticateUser(value);
  };

  return (
    <>
      <div>
        <h2>Enter Student Public Key</h2>
        <input
          type="text"
          placeholder="Enter your question JSON"
          className="w-full py-2 px-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30"
        />
      </div>
{/* // if successfull then show the questions otherwise a loading screen */}
    </>
  );
}

export default StudentLogin;
