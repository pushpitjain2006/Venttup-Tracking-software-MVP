import React, { useState } from "react";
import {
  FaLeaf,
  FaIndustry,
  FaRupeeSign,
  FaFileUpload,
  FaComments,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import orderStatuses from "../../config/orderStatusConfig.js";

const PlaceOrder = () => {
  const [orderType, setOrderType] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedStep, setSelectedStep] = useState("");
  const axios = useAxios();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const arrayOfSteps = orderStatuses.orderType;

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderType || !selectedSector || !totalAmount) {
      return toast.error("Please fill all the fields");
    }
    const res = await axios.post("/customer/place-orders", {
      orderType,
      totalAmount,
      sector: selectedSector,
      comments: message,
    });

    if (res.status === 201) {
      toast.success("Order placed successfully");
      setOrderType("");
      setSelectedSector("");
      setMessage("");
      setFile(null);
      setTotalAmount("");
    } else {
      toast.error("Order placement failed");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("orderId", res?.orderId);
    formData.append("documentName", selectedStep);
    const resFile = axios.post(`/customer/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (resFile.status === 200) {
      toast.success("File uploaded successfully!");
    } else {
      toast.error("Failed to upload file.");
    }
  };

  const handleLogout = async () => {
    const res = await axios.get("/vendor/logout");
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-100 to-green-100 p-4 sm:p-8 flex justify-center items-center">
      <div className="max-w-3xl w-full p-4 sm:p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              window.history.back();
            }}
            className="text-green-700 font-semibold flex items-center hover:text-green-800"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-green-700 flex items-center">
            <FaLeaf className="text-2xl sm:text-3xl mr-2" /> Get Quote
          </h1>
          <button
            className="text-white bg-green-600 px-2 sm:px-4 py-2 rounded hover:bg-green-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaIndustry className="mr-2" /> Requirement Selection
            </label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full p-2 sm:p-3 rounded border-2 border-gray-300 focus:border-green-500"
            >
              <option value="">Select Requirement</option>
              <option value="localization">Localization / NPD</option>
              <option value="contract_manufacturing">
                Contract Manufacturing
              </option>
              <option value="supply_chain">Supply Chain Distribution</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaLeaf className="mr-2" /> Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full p-2 sm:p-3 rounded border-2 border-gray-300 focus:border-green-500"
            >
              <option value="">Select Sector</option>
              <option value="Energy Sector">Energy Sector</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="EV">EV</option>
              <option value="Defense / Aerospace">Defense / Aerospace</option>
              <option value="Green Building">Green Building</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaRupeeSign className="mr-2" /> Proposed Price (INR)
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="w-full p-2 sm:p-3 rounded border-2 border-gray-300 focus:border-green-500"
              placeholder="Enter your proposed price"
            />
          </div>

          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaComments className="mr-2" /> Messages or Comments
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full p-2 sm:p-3 rounded border-2 border-gray-300 focus:border-green-500"
              placeholder="Enter any specific requirements or comments here"
            ></textarea>
          </div>

          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaFileUpload className="mr-2" /> File Uploads (Design or other
              documents)
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-green-600 file:text-white hover:file:bg-green-700"
            />
          </div>

          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaFileUpload className="mr-2" /> Select Step for File Upload
            </label>
            <select
              value={selectedStep}
              onChange={(e) => setSelectedStep(e.target.value)}
              className="w-full p-2 sm:p-3 rounded border-2 border-gray-300 focus:border-green-500"
            >
              <option value="">Select Step</option>
              {arrayOfSteps.map((step, index) => (
                <option key={index} value={step}>
                  {step}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition duration-300"
          >
            Get Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
