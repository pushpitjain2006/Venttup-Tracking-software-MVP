import React, { useState } from "react";
import { FaLeaf, FaArrowLeft, FaSync } from "react-icons/fa";
import useFetchVendorOrders from "../../../hooks/useFetchVendorOrders.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewVendorOrders = () => {
  const navigate = useNavigate();
  const {
    vendorOrders,
    error,
    loading,
    reload: fetchVendorOrders,
  } = useFetchVendorOrders();
  const getStatusColorClass = (status) => {
    switch (status) {
      case "Order completed":
        return "border-green-500 bg-green-100";
      case "Vendor Assigned":
        return "border-yellow-500 bg-yellow-100";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-100 to-green-100 p-4 md:p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full p-4 md:p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-green-700 font-semibold flex items-center hover:text-green-800 mb-2 md:mb-0"
          >
            <FaArrowLeft className="mr-2" /> Home
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-green-700 flex items-center">
            <FaLeaf className="text-2xl md:text-3xl mr-2" /> View Orders
          </h1>
          <button
            onClick={() => fetchVendorOrders()}
            className="text-green-700 font-semibold flex items-center hover:text-green-800 mt-2 md:mt-0"
          >
            <FaSync className="mr-2" /> Reload
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
          {loading ? (
            <p className="text-center text-gray-600 font-medium">
              Loading orders...
            </p>
          ) : error ? (
            <p className="text-center text-red-600 font-medium">
              Error fetching orders.
            </p>
          ) : vendorOrders && vendorOrders.length > 0 ? (
            vendorOrders.map((order, index) => (
              <div
                key={order.id || index}
                onClick={() => {
                  if (order.currentStatus === "Vendor Assigned") {
                    toast.info("Vendor has not yet accepted the order.");
                  } else {
                    navigate(`/order-details/${order._id}`);
                  }
                }}
                className={`p-4 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer ${getStatusColorClass(
                  order.currentStatus
                )}`}
              >
                <h3 className="text-base md:text-lg font-semibold text-green-700 mb-2">
                  Order #{index + 1}
                </h3>
                <p>
                  <span className="font-medium">Requirement:</span>{" "}
                  {order.orderType}
                </p>
                <p>
                  <span className="font-medium">Sector:</span> {order.sector}
                </p>
                <p>
                  <span className="font-medium">Comments:</span>{" "}
                  {order.comments || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ₹
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  {order.currentStatus}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 font-medium">
              No orders found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewVendorOrders;
