import React from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";

const CustomerDashboard = () => {
  const { setAuth } = useAuth();
  async function handelLogout() {
    setAuth(null);
    const axios = useAxios();
    const res = await axios.get("/vendor/logout");
    console.log(res);
    window.location.href = "/";
  }
  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="flex items-center justify-between bg-green-600 shadow-md p-4 mb-6 rounded-lg">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold text-white">
            Customer Dashboard
          </h1>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/plant-under-sun.png"
            alt="Place Order"
            className="mx-auto mt-4"
          />
        </div>
        <button
          className="text-white font-medium hover:underline"
          onClick={() => {
            handelLogout();
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1 bg-white shadow-lg rounded-lg p-[6rem] text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-green-800">Place Order</h2>
        </div>

        <div className="flex-1 bg-white shadow-lg rounded-lg p-[6rem] text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-green-800">View Orders</h2>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
