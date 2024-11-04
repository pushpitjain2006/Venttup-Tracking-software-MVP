import React, { useState } from "react";
import useFetchOrders from "../../../hooks/useFetchOrders";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllOrderDetails = () => {
  const navigate = useNavigate();
  const { orders, error, loading } = useFetchOrders();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [adminApprovalFilter, setAdminApprovalFilter] = useState("all");
  const [amountRange, setAmountRange] = useState([0, 100000]);

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch = searchQuery
        ? Object.values(order).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
          )
        : true;
      const matchesOrderType =
        selectedOrderType === "all" || order.orderType === selectedOrderType;
      const matchesAdminApproval =
        adminApprovalFilter === "all" ||
        (adminApprovalFilter === "approved" && order.adminApproval) ||
        (adminApprovalFilter === "pending" && !order.adminApproval);
      const matchesAmountRange =
        order.totalAmount >= amountRange[0] &&
        order.totalAmount <= amountRange[1];
      return (
        matchesSearch &&
        matchesOrderType &&
        matchesAdminApproval &&
        matchesAmountRange
      );
    })
    .sort((a, b) => {
      if (sortOption === "amountAsc") return a.totalAmount - b.totalAmount;
      if (sortOption === "amountDesc") return b.totalAmount - a.totalAmount;
      if (sortOption === "statusAsc") return a.currentStep - b.currentStep;
      if (sortOption === "statusDesc") return b.currentStep - a.currentStep;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <div className="w-full h-24 bg-gray-800 flex items-center justify-between p-6 shadow-md">
        <House
          className="w-10 h-10 cursor-pointer text-white hover:text-gray-400 transition-colors"
          onClick={() => navigate("/")}
        />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-6 w-1/2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="ml-4 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">Sort By</option>
          <option value="amountAsc">Amount (Low to High)</option>
          <option value="amountDesc">Amount (High to Low)</option>
          <option value="statusAsc">Status (Low to High)</option>
          <option value="statusDesc">Status (High to Low)</option>
        </select>
      </div>

      <h1 className="text-3xl font-semibold text-center my-8">Orders</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          value={adminApprovalFilter}
          onChange={(e) => setAdminApprovalFilter(e.target.value)}
          className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="all">All Approvals</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <div className="flex items-center">
          <span className="mr-2 text-gray-400">Amount:</span>
          <input
            type="number"
            placeholder="Min"
            value={amountRange[0]}
            onChange={(e) => setAmountRange([+e.target.value, amountRange[1]])}
            className="w-20 p-2 mr-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={amountRange[1]}
            onChange={(e) => setAmountRange([amountRange[0], +e.target.value])}
            className="w-20 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Orders Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredOrders.length ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              className="relative group min-h-80 bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl p-6 m-3 shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Order Type:</span>{" "}
                {order.orderType}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">
                  Total Amount:
                </span>{" "}
                ₹{order.totalAmount}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">
                  Current Status:
                </span>{" "}
                {order.currentStatus}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Vendor ID:</span>{" "}
                {order.vendorId || "Not Assigned"}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">Sector:</span>{" "}
                {order.sector}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-gray-300">
                  Admin Approval:
                </span>{" "}
                {order.adminApproval ? "Approved" : "Pending"}
              </p>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="bg-blue-600 text-white py-2 px-4 w-full h-12 rounded-b-lg font-semibold hover:bg-blue-700 shadow-lg transition-transform duration-200 transform hover:scale-110"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  View Order Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-gray-400">No orders to show</h1>
        )}
      </div>

      {/* Floating Dock for Order Type Selection */}
      <div className="fixed bottom-4 left-0 right-0 mx-auto flex justify-center bg-gray-800 p-3 rounded-full shadow-lg w-max transition-transform duration-300 hover:scale-105 gap-2">
        {["all", "localization", "contract_manufacturing", "supply_chain"].map(
          (type) => (
            <button
              key={type}
              className={`py-2 px-4 mx-1 rounded-full font-semibold transition-transform duration-200 ${
                selectedOrderType === type
                  ? "bg-blue-600 text-white scale-110 shadow-lg"
                  : "bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white hover:scale-110"
              }`}
              onClick={() => setSelectedOrderType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ")}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AllOrderDetails;
