import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderUploadForm = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [formData, setFormData] = useState({
    customerId: "",
    orderType: "",
    totalAmount: "",
    currentStatus: "Waiting Admin Approval",
    vendorId: "",
    adminApproval: true,
    customerApproval: false,
    sector: "",
    comments: "",
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setFormData({ ...formData, documents: fileData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/upload-order", {
        data: formData,
      });
      toast(response.data.message);
      setFormData({
        customerId: "",
        orderType: "",
        totalAmount: "",
        currentStatus: "Waiting Admin Approval",
        vendorId: "",
        adminApproval: true,
        customerApproval: false,
        sector: "",
        comments: "",
        documents: [],
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 flex items-center space-x-2 bg-white text-blue-600 py-2 px-4 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 ">
        <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg m-10">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Order Upload
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="customerId"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Customer
              </label>
              <input
                type="text"
                id="customerId"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="orderType"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Order Type
              </label>
              <select
                id="orderType"
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Order Type</option>
                <option value="localization">Localization</option>
                <option value="contract_manufacturing">
                  Contract Manufacturing
                </option>
                <option value="supply_chain">Supply Chain</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="totalAmount"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Total Amount
              </label>
              <input
                type="number"
                id="totalAmount"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="currentStatus"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Current Status
              </label>
              <select
                id="currentStatus"
                name="currentStatus"
                value={formData.currentStatus}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="Waiting Admin Approval">
                  Waiting Admin Approval
                </option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sector"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Sector</option>
                <option value="sector_1">Sector 1</option>
                <option value="sector_2">Sector 2</option>
                <option value="sector_3">Sector 3</option>
                <option value="sector_4">Sector 4</option>
                <option value="sector_5">Sector 5</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="comments"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Comments (Optional)
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="4"
              />
            </div>
            <div>
              <label
                htmlFor="documents"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Upload Documents
              </label>
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                multiple
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-green-500 transition-colors"
            >
              Upload Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderUploadForm;
