import React from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";
import { Link } from "react-router-dom";
import { GiRecycle, GiFactory } from "react-icons/gi";

const CustomerDashboard = () => {
  const axios = useAxios();
  const { setAuth } = useAuth();
  
  async function handleLogout() {
    setAuth(null);
    const res = await axios.get("/vendor/logout");
    console.log(res);
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-gray-100 to-green-100 p-6">
      <div className="flex items-center justify-between bg-green-600 shadow-md p-4 mb-6 rounded-lg">
        <div className="flex gap-4 items-center">
          <GiFactory className="text-white w-8 h-8" />
          {/* <img
            src="https://img.icons8.com/ios-filled/50/000000/plant-under-sun.png"
            alt="Place Order"
            className="mx-auto mt-4"
          /> */}
          <h1 className="text-3xl font-semibold text-white">
            Customer Dashboard
          </h1>
        </div>
        <button
          className="text-white hover:text-black font-medium hover:underline cursor-pointer hover:bg-slate-600 bg-slate-400 py-2 px-3 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div
          onClick={() => {
            window.location.href = "/PlaceOrder";
          }}
          className="flex-1 bg-white shadow-lg rounded-lg p-16 text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
        >
          <GiRecycle className="text-green-600 w-12 h-12 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-green-800">Get a Quote</h2>
          <p className="text-gray-600 mt-2">
            Request a sustainable quote tailored to eco-friendly materials and processes.
          </p>
        </div>

        <div
          className="flex-1 bg-white shadow-lg rounded-lg p-16 text-center transform transition duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer"
          onClick={() => {
            window.location.href = "/ViewOrders";
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