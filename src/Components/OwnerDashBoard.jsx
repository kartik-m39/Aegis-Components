import React, { useState } from "react";
import { ethers } from "ethers";

function OwnerDashBoard() {
  const [isconnected, setIsConnected] = useState(false);
  const [contract, setContract] = useState(null);

  // Status messages
  const [message, setMessage] = useState("");

  // Exam start time state
  const [examStartTime, setExamStartTime] = useState("");

  // Setter fields
  const [setterAddress, setSetterAddress] = useState("");
  const [setterName, setSetterName] = useState("");
  const [setterGovID, setSetterGovID] = useState("");
  const [setterAadhar, setSetterAadhar] = useState("");
  const [setterDOB, setSetterDOB] = useState("");

  const contractAddress = "0x3c907487574514ca7b7df17de0e3a5f3b56d4d38";
  const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AccessControlBadConfirmation",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "neededRole",
				"type": "bytes32"
			}
		],
		"name": "AccessControlUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "evaluatorGovID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EvaluatorRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "startTime",
				"type": "uint64"
			}
		],
		"name": "ExamStartTimeSet",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getExamStartTime",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "govID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "dateOfBirth",
				"type": "uint64"
			}
		],
		"name": "registerEvaluator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "setter",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "govID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint64",
				"name": "dateOfBirth",
				"type": "uint64"
			}
		],
		"name": "registerSetter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "aadharNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "dateOfBirth",
				"type": "uint256"
			}
		],
		"name": "registerStudents",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "callerConfirmation",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "evaluator",
				"type": "address"
			}
		],
		"name": "revokeEvaluator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "setter",
				"type": "address"
			}
		],
		"name": "revokeSetter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "student",
				"type": "address"
			}
		],
		"name": "revokeStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_startTime",
				"type": "uint64"
			}
		],
		"name": "setExamStartTime",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "setter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "setterGovID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "SetterRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "student",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "StudentRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "action",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "UserInteraction",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EXAM_EVALUATOR_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "EXAM_SETTER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OWNER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "showUserData",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "role",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startTime",
		"outputs": [
			{
				"internalType": "uint64",
				"name": "",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STUDENT_REGISTRATION_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STUDENT_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

  async function connectWallet() {
    if (!window.ethereum) {
      setMessage("Metamask not installed");
      return;
    }

    // requesting metamask connection
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);

    setIsConnected(true);
  }

  const handleExamStart = async () => {
    if (!isconnected || !contract) {
      setMessage("Wallet not connected");
      return;
    }

    try {
      // Convert date string to Unix timestamp (seconds)
      const timestamp = Math.floor(new Date(examStartTime).getTime() / 1000);

      if (isNaN(timestamp) || timestamp <= Math.floor(Date.now() / 1000)) {
        setMessage("Please enter a valid future date and time");
        return;
      }

      // Call contract method
      const tx = await contract.setExamStartTime(timestamp);
      await tx.wait();
    } catch (err) {
      setMessage("Error setting exam start time");
      console.log(err.message);
    }
  };

  const handleAddSetter = async () => {
    if (!isconnected || !contract) {
      setMessage("Please connect wallet first");
      return;
    }

    try {
      setMessage("Registering exam setter...");
      if (!setterName || !setterGovID || !setterAadhar || !setterDOB) {
        setMessage("Please fill all setter fields");
        return;
      }

      const dobTimestamp = Math.floor(new Date(setterDOB).getTime() / 1000);

      const tx = await contract.registerSetter(
        setterAddress,
        setterName,
        setterGovID,
        setterAadhar,
        dobTimestamp
      );
      await tx.await();
    } catch (err) {
      setMessage("Please fill all setter fields");
      console.log(err.message);
    }
  };

// can add evaluator function as well

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center p-6">

      <div className="w-full max-w-md bg-gray-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20 mb-8">
        {!isconnected ? (
          <button
            onClick={connectWallet}
            className="w-full py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30 disabled:opacity-50"
          >
            ConnectWallet
          </button>
        ) : (
          <div className="text-center">
            <span className="text-green-400 font-medium">Wallet Connected</span>
          </div>
        )}</div>

        
        {/* Main Heading */}
        <h1 className="text-5xl font-bold text-white mb-12 tracking-wide">
          Owner Dashboard
        </h1>

        {/* Start the Exam Section */}
        <div className="w-full max-w-md bg-gray-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Start the Exam
          </h2>
          <input
            type="datetime-local"
            value={examStartTime}
            onChange={(e) => setExamStartTime(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <button
            onClick={handleExamStart}
            className="w-full py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30 disabled:opacity-50"
          >
            Start Exam
          </button>
        </div>

        {/* Add Exam Setter Section */}
        <div className="w-full max-w-md bg-gray-800/50 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-500/20 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Add Exam Setter
          </h2>
          <input
            type="text"
            placeholder="Enter exam setter address"
            value={setterAddress}
            onChange={(e) => setSetterAddress(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Enter name"
            value={setterName}
            onChange={(e) => setSetterName(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Enter Government ID"
            value={setterGovID}
            onChange={(e) => setSetterGovID(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Enter Aadhar Number"
            value={setterAadhar}
            onChange={(e) => setSetterAadhar(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={setterDOB}
            onChange={(e) => setSetterDOB(e.target.value)}
            className="w-full py-2 px-4 mb-4 bg-gray-900 text-white border-2 border-green-500 rounded-md focus:outline-none focus:border-green-400 placeholder-gray-400"
          />
          <button
            onClick={handleAddSetter}
            className="w-full py-2 px-4 bg-purple-500 text-white font-medium rounded-md border-2 border-green-400 hover:bg-purple-600 hover:border-green-300 transition-all duration-300 shadow-md hover:shadow-green-500/30 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default OwnerDashBoard;
