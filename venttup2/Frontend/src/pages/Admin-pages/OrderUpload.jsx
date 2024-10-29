import React, { useState } from "react";
import { House } from "lucide-react";
import useAxios from "../../utils/useAxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderUploadForm = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [formData, setFormData] = useState({
    customerGstin: "",
    orderType: "",
    amount: "",
    sector: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/upload-order", {
        data: formData,
      });
      toast(response.data.message);
      setFormData({
        customerGstin: "",
        orderType: "",
        amount: "",
        sector: "",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="fixed w-full h-16 flex justify-between bg-slate-400">
        <House
          className="w-10 h-10 m-3 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="w-96 p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">ORDER UPLOAD</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="customerGstin"
                className="block text-lg font-medium mb-1"
              >
                Customer GSTIN
              </label>
              <input
                type="text"
                id="customerGstin"
                name="customerGstin"
                value={formData.customerGstin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="orderType"
                className="block text-lg font-medium mb-1"
              >
                Order Type
              </label>
              <select
                id="orderType"
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
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
                htmlFor="amount"
                className="block text-lg font-medium mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label
                htmlFor="sector"
                className="block text-lg font-medium mb-1"
              >
                Sector
              </label>
              <select
                id="sector"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
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
