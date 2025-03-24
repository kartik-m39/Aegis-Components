import { ethers } from "ethers";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit, reset } = useForm();

  const [student, setStudent] = useState();
  const [status, setStatus] = useState("");

  const handlesetStatus = (msg) => {
    setStatus(msg);
  };

  const sampleDetails = {
    student: "0xc016773A2f734594b0f07aC46986fA3282f0373c",
    name: "Kartik",
    studentID: "123456",
    aadharNumber: "827498529482",
    dateofBirth: "1742779250",
  };

  const contractAddress = "0x20a235fe00b1f5e84a0ad454bdc032e43595678d";
  const contractABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "AccessControlBadConfirmation",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "neededRole",
          type: "bytes32",
        },
      ],
      name: "AccessControlUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "evaluator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "evaluatorGovID",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "EvaluatorRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "startTime",
          type: "uint64",
        },
      ],
      name: "ExamStartTimeSet",
      type: "event",
    },
    {
      inputs: [],
      name: "getExamStartTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "evaluator",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "govID",
          type: "string",
        },
        {
          internalType: "string",
          name: "aadharNumber",
          type: "string",
        },
        {
          internalType: "uint64",
          name: "dateOfBirth",
          type: "uint64",
        },
      ],
      name: "registerEvaluator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "setter",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "govID",
          type: "string",
        },
        {
          internalType: "string",
          name: "aadharNumber",
          type: "string",
        },
        {
          internalType: "uint64",
          name: "dateOfBirth",
          type: "uint64",
        },
      ],
      name: "registerSetter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "student",
          type: "address",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "studentID",
          type: "string",
        },
        {
          internalType: "string",
          name: "aadharNumber",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "dateOfBirth",
          type: "uint256",
        },
      ],
      name: "registerStudents",
      outputs: [
        {
          internalType: "uint32",
          name: "",
          type: "uint32",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "callerConfirmation",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "evaluator",
          type: "address",
        },
      ],
      name: "revokeEvaluator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "setter",
          type: "address",
        },
      ],
      name: "revokeSetter",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "student",
          type: "address",
        },
      ],
      name: "revokeStudent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "previousAdminRole",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "bytes32",
          name: "newAdminRole",
          type: "bytes32",
        },
      ],
      name: "RoleAdminChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleGranted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: true,
          internalType: "address",
          name: "account",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RoleRevoked",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_startTime",
          type: "uint64",
        },
      ],
      name: "setExamStartTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "setter",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "setterGovID",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "SetterRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "student",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "studentID",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "StudentRegistered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "action",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
      ],
      name: "UserInteraction",
      type: "event",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
    {
      inputs: [],
      name: "DEFAULT_ADMIN_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "EXAM_EVALUATOR_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "EXAM_SETTER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "OWNER_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "user",
          type: "address",
        },
      ],
      name: "showUserData",
      outputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "role",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "startTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "STUDENT_REGISTRATION_FEE",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "STUDENT_ROLE",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const StudentRegistrationFees = ethers.parseEther("0.0025");

  const registerStudent = async (data) => {
    if (!window.ethereum) {
      handlesetStatus("Please install MetaMask!");
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

      const { student, name, studentID, aadharNumber, dateOfBirth } = data;

      if (!student || !name || !studentID || !aadharNumber || !dateOfBirth) {
        handlesetStatus("Please fill all fields.");
        return;
      }

      const dateofBirthTimestamp = Math.floor(
        new Date(dateOfBirth).getTime() / 1000
      );

// sample comparing
      if (
        sampleDetails.name === name &&
        sampleDetails.studentID === studentID &&
        sampleDetails.aadharNumber === aadharNumber &&
        sampleDetails.dateofBirth === dateofBirthTimestamp
      ) {
        handlesetStatus("Student already exists!");
      }

//real comparison
      const studentDetails = await contract.authStudents(student);
      if (studentDetails.isRegistered) {
        handlesetStatus("Student already registered!");
        return;
      }

      handlesetStatus("Waiting for MetaMask confirmation...");

      // Send Transaction
      const transaction = await contract.registerStudents(
        student,
        name,
        studentID,
        aadharNumber,
        dateofBirthTimestamp,
        { value: StudentRegistrationFees }
      );

      //Waiting for transaction confirmation
      const receipt = await transaction.wait();
      console.log(receipt);
      handlesetStatus(
        `Registration Successfull! Transaction Hash: ${receipt.transactionHash}`
      );

      contract.on("StudentRegistered", (student, studentID, timestamp) => {
        console.log(
          `Student ${student} registered with ID ${studentID} at ${timestamp}`
        );
      });

      //navigate to next page
    } catch (err) {
      console.error("Transaction failed: ", err);
      handlesetStatus(`Error: ${err.message}`);
    }
  };

  const onSubmit = (data) => {
    setStudent(data);
    registerStudent(data)
    console.log(data);
    reset();
  };

  return (
    <>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-black rounded-lg p-8 w-full max-w-md shadow-lg shadow-white/50">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Student Details
          </h2>

          <h4 className="text-green text-center">{status}</h4>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-100 justify-center"
          >
            <label className="text-gray-300 mb-1">Student Public Key</label>
            <input
              type="text"
              {...register("student")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 "
            />
            <label className="text-gray-300 mb-1">Student Name</label>
            <input
              type="text"
              {...register("name")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 "
            />

            <label className="text-gray-300 mb-1">StudentID</label>
            <input
              type="text"
              {...register("studentID")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 "
            />

            <label className="text-gray-300 mb-1">Aadhar Card Number</label>
            <input
              type="text"
              name
              {...register("aadharNumber")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700"
            />

            <label className="text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              placeholder="dd/mm/yy"
              {...register("dateOfBirth")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700"
            />

            <label className="text-gray-300 mb-1">Qualification</label>
            <select
              {...register("Qualification")}
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 "
            >
              <option>10th</option>
              <option>12th</option>
              <option>Undergraduate</option>
              <option>Postgraduate</option>
            </select>

            <label className="text-gray-300 mb-1">
              Percentage Scored in last qualification{" "}
            </label>
            <input
              type="text"
              {...register("Percentage")}
              required
              className="mb-3 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700"
            />

            <input
              type="submit"
              className="mt-7 text-xl font-semibold px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-200"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
