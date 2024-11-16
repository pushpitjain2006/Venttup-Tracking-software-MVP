import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";
import { GiRecycle, GiFactory } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const { setAuth } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleLogout() {
    setAuth(null);
    const res = await axios.get("/vendor/logout");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-gray-100 to-green-100 p-6">
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              Confirm Logout
            </h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between bg-green-600 shadow-md p-4 mb-6 rounded-lg">
        <div className="flex gap-4 items-center">
          <GiFactory className="text-white w-8 h-8" />
          <h1 className="text-3xl font-semibold text-white">
            Customer Dashboard
          </h1>
        </div>
        <button
          className="text-white font-medium bg-green-500 py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          onClick={() => setShowLogoutModal(true)}
        >
          Logout
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div
          onClick={() => {
            navigate("/PlaceOrder");
          }}
          className="flex-1 bg-white shadow-lg rounded-lg p-16 text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <GiRecycle className="text-green-600 w-12 h-12 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-green-800">Get a Quote</h2>
          <p className="text-gray-600 mt-2">
            Request a sustainable quote tailored to eco-friendly materials and
            processes.
          </p>
        </div>

        <div
          className="flex-1 bg-white shadow-lg rounded-lg p-16 text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
          onClick={() => {
            navigate("/ViewOrders");
          }}
        >
          <GiFactory className="text-green-600 w-12 h-12 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-green-800">View Orders</h2>
          <p className="text-gray-600 mt-2">
            View current orders and track the progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
