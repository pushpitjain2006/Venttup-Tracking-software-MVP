import React from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";

const VendorDashboard = () => {
  const { setAuth } = useAuth();
  const axios = useAxios();
  async function handleLogout() {
    setAuth(null);
    const res = await axios.get("/vendor/logout");
    console.log(res);
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-blue-600 shadow-md p-4 mb-6 rounded-lg">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold text-white">
            Vendor Dashboard
          </h1>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/industrial-scales.png"
            alt="Sustainable Manufacturing"
            className="mx-auto mt-4"
          />
        </div>
        <button
          className="text-white font-medium hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-[6rem] text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-blue-800">View Requests</h2>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-lg p-[6rem] text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-blue-800">
            View & Update Current Order
          </h2>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-lg p-[6rem] text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-blue-800">
            Orders History
          </h2>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
