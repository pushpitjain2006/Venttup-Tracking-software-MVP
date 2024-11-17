import React, { useState } from "react";
import { FaLeaf, FaArrowLeft, FaSync } from "react-icons/fa";
import useFetchOrders from "../../../hooks/useFetchOrders.js";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const { orders, error, loading } = useFetchOrders();
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const navigate = useNavigate();

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

  const filteredOrders = orders.filter((order) => {
    const orderTypeMatch = order.orderType
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const sectorMatch = order.sector
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const commentsMatch = (order.comments || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return orderTypeMatch || sectorMatch || commentsMatch;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (sortOption === "price") {
      return a.totalAmount - b.totalAmount;
    } else if (sortOption === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-gray-100 to-green-100 p-4 md:p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full p-4 md:p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-green-700 font-semibold flex items-center hover:text-green-800 mb-2 md:mb-0"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-green-700 flex items-center mb-2 md:mb-0">
            <FaLeaf className="text-2xl md:text-3xl mr-2" /> View Orders
          </h1>
          <button
            onClick={() => setCount(count + 1)}
            className="text-green-700 font-semibold flex items-center hover:text-green-800"
          >
            <FaSync className="mr-2" /> Reload
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:p-3 w-full  mb-2 md:mb-0 mr-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 md:p-3 w-full max-w-36 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          >
            <option value="default">Sort By</option>
            <option value="price">Price</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {loading ? (
            <p className="text-center text-gray-600 font-medium">
              Loading orders...
            </p>
          ) : error ? (
            <p className="text-center text-red-600 font-medium">
              Error fetching orders.
            </p>
          ) : sortedOrders && sortedOrders.length > 0 ? (
            sortedOrders.map((order, index) => (
              <div
                key={order.id || index}
                onClick={() => {
                  navigate(`/order-details/${order._id}`);
                }}
                className={`p-4 border-2 border-gray-300 rounded-lg shadow hover:shadow-lg hover:border-green-600 transition duration-300 cursor-pointer ${getStatusColorClass(
                  order.currentStatus
                )}`}
              >
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  {order.name}
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
                <p>
                  <span className="font-medium">Last Updated:</span>{" "}
                  {new Date(order.updatedAt).toLocaleString()}
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

export default ViewOrders;
