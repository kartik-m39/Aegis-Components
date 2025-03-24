import React, { useState } from "react";
import axios from "axios";

function TeacherUplaod() {
  const [question, setQuestion] = useState();

//set it as a global state/ in smart contract?
  const [CIDs, setCid] = useState([]);

// add in .env import.meta.env.
  const PINATA_API_KEY = "34e5a156dcda211cc4f4";
  const PINATA_SECRET_KEY = "96406ebf4e15091bb9878ff7c58970ea4731465d78bdb200369ec52233fce8d8";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = e.target.form.elements[0].value;
    setQuestion(value);

    try {
        //creating a proper JSON object to send to Pinata as useState is async and does not get updated immediately
        const jsonData = {
            question: value
        }

      // Make the API request to Pinata
      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      );

      // Getting the CID
      const ipfsHash = response.data.IpfsHash;
      console.log("Successfully pinned JSON to IPFS with hash:", ipfsHash);

      setCid((prev) => [...prev, ipfsHash] )

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full  bg-gray-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white mb-4">Upload the Questions</h2>

      {/* Form */}
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your question JSON"
          className="w-full py-2 px-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30"
        >
          Upload
        </button>
      </form>
    </div>
    </>
  );
}

export default TeacherUplaod;
