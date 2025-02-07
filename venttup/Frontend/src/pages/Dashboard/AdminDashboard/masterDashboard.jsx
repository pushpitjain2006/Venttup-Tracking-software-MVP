import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext.jsx";
import useAxios from "../../../utils/useAxios.js";
import {
  FaUserShield,
  FaClipboardList,
  FaUserPlus,
  FaUpload,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const axios = useAxios();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  async function handleUserManagement() {
    navigate("/view-users");
  }

  async function handleOrderManagement() {
    navigate("/admin/ViewOrders");
  }

  async function handleAddUser() {
    navigate("/Admin-signup");
  }

  async function handleUploadOrder() {
    navigate("/upload-order");
  }

  async function handleLogout() {
    setAuth(null);
    await axios.get("/admin/logout");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-white to-blue-200 p-8">
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="flex items-center justify-between bg-blue-700 shadow-lg p-5 rounded-xl mb-8 text-white flex-wrap sm:flex-nowrap">
        <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>
          <FaUserShield className="text-4xl" />
        </div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="text-sm font-semibold tracking-wide px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition-all w-full sm:w-auto"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-blue-600 transform hover:rotate-1"
          onClick={handleUserManagement}
        >
          <h2 className="text-2xl font-bold text-blue-700 flex items-center justify-center gap-3">
            <FaClipboardList className="text-blue-600 text-3xl" /> Manage Users
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Review, edit, and manage user accounts.
          </p>
        </div>

        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-blue-600 transform hover:-rotate-1"
          onClick={handleOrderManagement}
        >
          <h2 className="text-2xl font-bold text-blue-700 flex items-center justify-center gap-3">
            <FaClipboardList className="text-blue-600 text-3xl" /> Manage Orders
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Track and oversee all ongoing and completed orders.
          </p>
        </div>

        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-blue-600 transform hover:rotate-1"
          onClick={handleAddUser}
        >
          <h2 className="text-2xl font-bold text-blue-700 flex items-center justify-center gap-3">
            <FaUserPlus className="text-blue-600 text-3xl" /> Add User
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Create new user accounts with specific roles.
          </p>
        </div>

        <div
          className="flex-1 bg-white shadow-md rounded-xl p-[5rem] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-l-8 border-blue-600 transform hover:-rotate-1"
          onClick={handleUploadOrder}
        >
          <h2 className="text-2xl font-bold text-blue-700 flex items-center justify-center gap-3">
            <FaUpload className="text-blue-600 text-3xl" /> Upload Order
          </h2>
          <p className="mt-3 text-gray-500 text-sm">
            Upload and manage new orders for the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
