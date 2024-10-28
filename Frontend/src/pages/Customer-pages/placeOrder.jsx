import React, { useState } from "react";
import {
  FaLeaf,
  FaIndustry,
  FaRupeeSign,
  FaFileUpload,
  FaComments,
} from "react-icons/fa"; // Using Font Awesome icons
import { toast } from "react-toastify";
import useAxios from "../../utils/useAxios.js";

const PlaceOrder = () => {
  const [orderType, setSelectedRequirement] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [totalAmount, setPrice] = useState("");
  const axios = useAxios();

  const handleFileUpload = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      selectedRequirement: orderType,
      selectedSector,
      message,
      file,
      price: totalAmount,
    });
    if (!orderType || !selectedSector || !totalAmount) {
      return toast.error("Please fill all the fields");
    }
    const res = await axios.post("/customer/place-order", {
      orderType,
      totalAmount,
    });

    console.log(res);
    if (res.status === 201) {
      toast.success("Order placed successfully");
      setSelectedRequirement("");
      setSelectedSector("");
      setMessage("");
      setFile(null);
      setPrice("");
    } else {
      toast.error("Order placement might have failed");
      console.log(res);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/sustainable-bg.jpg')] bg-cover bg-opacity-30 p-8 flex justify-center items-center">
      <div className="max-w-3xl w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Navbar with Sustainability Icon */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-green-700 flex items-center">
            <FaLeaf className="text-3xl mr-2" /> Place Order
          </h1>
          <button className="text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Requirement Selection with Icon */}
          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaIndustry className="mr-2" /> Requirement Selection
            </label>
            <select
              value={orderType}
              onChange={(e) => setSelectedRequirement(e.target.value)}
              className="w-full p-3 rounded border-2 border-gray-300 focus:border-emerald-500"
            >
              <option value="">Select Requirement</option>
              <option value="localization">Localisation / NPD</option>
              <option value="contract_manufacturing">
                B2B Contract Manufacturing
              </option>
              <option value="supply_chain">Green Building Material</option>
              <option value="supply_chain">Component / Equipment Supply</option>
              <option value="supply_chain">ESG Advisory</option>
              <option value="supply_chain">Other</option>
            </select>
          </div>

          {/* Sector with Icon */}
          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaLeaf className="mr-2" /> Sector
            </label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full p-3 rounded border-2 border-gray-300 focus:border-emerald-500"
            >
              <option value="">Select Sector</option>
              <option value="Energy Sector">Energy Sector</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="EV">EV</option>
              <option value="Defence / Aerospace">Defence / Aerospace</option>
              <option value="Green Building">Green Building</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price Input with Icon */}
          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaRupeeSign className="mr-2" /> Proposed Price (INR)
            </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded border-2 border-gray-300 focus:border-emerald-500"
              placeholder="Enter your proposed price"
            />
          </div>

          {/* Message or Comments with Icon */}
          <div>
            <label className="flex items-center text-green-700 font-medium mb-2">
              <FaComments className="mr-2" /> Messages or Comments
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full p-3 rounded border-2 border-gray-300 focus:border-emerald-500"
              placeholder="Enter any specific requirements or comments here"
            ></textarea>
          </div>

          {/* File Upload with Icon */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded hover:bg-emerald-700 transition duration-300"
          >
            Get Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
