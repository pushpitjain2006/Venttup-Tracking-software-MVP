import React from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";
import { FaIndustry, FaLeaf } from "react-icons/fa";

const VendorDashboard = () => {
  const { setAuth } = useAuth();
  const axios = useAxios();

  async function handleCurrentOrder() {
    const res = await axios.post("/vendor/get-vendor-orders");
    const ongoingOrders = res.data[0];
    if (res.data.length === 0) {
      alert("No ongoing orders");
    } else {
      window.location.href = "/order-details/" + ongoingOrders._id;
    }
  }

  async function handleLogout() {
    setAuth(null);
    const res = await axios.get("/vendor/logout");
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-white to-green-200 p-8">
      {/* Navbar */}
      <header className="flex items-center justify-between bg-green-700 shadow-lg p-5 rounded-xl mb-8 text-white">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-wide">Vendor Dashboard</h1>
          <FaIndustry className="text-4xl" />
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold tracking-wide px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md transition-all"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* View Requests */}
        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-green-600 transform hover:rotate-1"
          onClick={() => {
            window.location.href = "/ViewRequests";
          }}
        >
          <h2 className="text-2xl font-bold text-green-700 flex items-center justify-center gap-3">
            <FaLeaf className="text-green-600 text-3xl" /> View Requests
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Review new requests and manage them efficiently.
          </p>
        </div>

        {/* View & Update Current Order */}
        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-green-600 transform hover:-rotate-1"
          onClick={() => {
            handleCurrentOrder();
          }}
        >
          <h2 className="text-2xl font-bold text-green-700 flex items-center justify-center gap-3">
            <FaLeaf className="text-green-600 text-3xl" /> Update Current Order
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Track and modify ongoing orders to stay on top.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
