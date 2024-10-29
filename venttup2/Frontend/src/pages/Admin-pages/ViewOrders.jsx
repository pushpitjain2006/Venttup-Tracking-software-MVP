import React from "react";
import useFetchOrders from "../../../hooks/useFetchOrders";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllOrderDetails = () => {
  const navigate = useNavigate();
  const { orders, error, loading } = useFetchOrders();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full h-24 bg-gray-800 flex items-center p-6 shadow-md">
        <House
          className="w-10 h-10 cursor-pointer text-white hover:text-gray-400 transition-colors"
          onClick={() => navigate("/")}
        />
      </div>
      <h1 className="text-3xl font-semibold text-center my-8">Order Details</h1>
      <div className="flex flex-wrap justify-evenly items-end md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {orders.length?orders.map((order) => (
          <div
            key={order._id}
            className="relative group bg-gray-800 rounded-lg shadow-lg p-6 m-3 transition duration-300 hover:shadow-xl"
          >
            <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Order Type:</span> {order.orderType}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Total Amount:</span> ₹{order.totalAmount}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Current Status:</span> {order.currentStatus}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Current Step:</span> {order.currentStep}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Vendor ID:</span> {order.vendorId || "Not Assigned"}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Sector:</span> {order.sector}
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Admin Approval:</span> {order.adminApproval ? "Approved" : "Pending"}
            </p>

            {/* Overlay button that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 shadow-lg"
                onClick={() => navigate(`/order/${order._id}`)}
              >
                View Order Details
              </button>
            </div>
          </div>
        )):
        (
          <h1>No orders to show</h1>
        )}
      </div>
    </div>
  );
};

export default AllOrderDetails;
