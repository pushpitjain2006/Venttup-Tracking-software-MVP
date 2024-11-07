import React, { useState } from "react";
import useFetchOrders from "../../../hooks/useFetchOrders";
import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { FaLeaf, FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineBusinessCenter } from "react-icons/md";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400  to-green-700 text-white font-sans">
      <div className="w-full h-24 bg-blue-800 flex items-center justify-between p-6 shadow-md">
        <House
          className="w-10 h-10 cursor-pointer text-white hover:text-blue-400 transition-colors"
          onClick={() => navigate("/")}
        />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-6 w-1/2 p-3 rounded-lg bg-blue-600 bg-opacity-25 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="ml-4 p-2 rounded-lg bg-blue-600 bg-opacity-25 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="">Sort By</option>
          <option value="amountAsc">Amount (Low to High)</option>
          <option value="amountDesc">Amount (High to Low)</option>
          <option value="statusAsc">Status (Low to High)</option>
          <option value="statusDesc">Status (High to Low)</option>
        </select>
      </div>

      <h1 className="text-4xl font-semibold text-center my-8 text-white">
        Orders
      </h1>

      <div className="flex flex-wrap justify-center gap-5 mb-6 bg-opacity-10 bg-white p-2">
        <select
          value={adminApprovalFilter}
          onChange={(e) => setAdminApprovalFilter(e.target.value)}
          className="p-2 rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          <option value="all">All Approvals</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
        <div className="flex items-center">
          <span className="mr-2 text-gray-200">Amount:</span>
          <input
            type="number"
            placeholder="Min"
            value={amountRange[0]}
            onChange={(e) => setAmountRange([+e.target.value, amountRange[1]])}
            className="w-20 p-2 mr-2 rounded-lg bg-transparent text-white focus:outline-none ring-1 focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={amountRange[1]}
            onChange={(e) => setAmountRange([amountRange[0], +e.target.value])}
            className="w-20 p-2 rounded-lg bg-transparent text-white focus:outline-none ring-1 focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : filteredOrders.length ? (
          filteredOrders.map((order) => (
            <div
              key={order._id}
              onClick={() => navigate(`/order/${order._id}`)}
              className="relative group min-h-80 bg-gray-100 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl p-5 m-3 shadow-lg border-l-4 border-blue-500"
            >
              <h2 className="text-xl font-bold text-gray-500">
                Order ID: {order._id}
              </h2>
              <div className="my-6">
                <p className="text-blue-500 mb-2">
                  <FaLeaf className="inline mr-2 text-blue-400" />
                  <span className="font-semibold text-gray-500">
                    Order Type:
                  </span>{" "}
                  {order.orderType}
                </p>
                <p className="text-blue-500 mb-2">
                  <FaMoneyBillWave className="inline mr-2 text-blue-400" />
                  <span className="font-semibold text-gray-500">
                    Total Amount:
                  </span>{" "}
                  ₹{order.totalAmount}
                </p>
                <p className="text-blue-500 mb-2">
                  <MdOutlineBusinessCenter className="inline mr-2 text-blue-400" />
                  <span className="font-semibold text-gray-500">
                    Current Status:
                  </span>{" "}
                  {order.currentStatus}
                </p>
                <p className="text-blue-500 mb-2">
                  <span className="font-semibold text-gray-500">
                    Vendor ID:
                  </span>{" "}
                  {order.vendorId || "Not Assigned"}
                </p>
                <p className="text-blue-500 mb-2">
                  <span className="font-semibold text-gray-500">Sector:</span>{" "}
                  {order.sector}
                </p>
                <div className="text-blue-500 mb-2">
                  <div className="flex gap-2">
                    <span className="font-semibold text-gray-500">
                      Admin Approval:
                    </span>
                    {order.adminApproval ? (
                      <span className="text-green-500 flex items-center">
                        <BsFillCheckCircleFill className="mr-1" /> Approved
                      </span>
                    ) : (
                      <span className="text-yellow-300 flex items-center">
                        <BsFillXCircleFill className="mr-1" /> Pending
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-500 mb-1 text-xs">
                      <div className="font-semibold text-gray-600">
                        Created At:
                      </div>
                      <span className="text-gray-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </span>
                    <span className="text-gray-500 mb-1 text-xs">
                      <div className="font-semibold text-gray-600">
                        Last Updated At:
                      </div>
                      <span className="text-gray-400">
                        {new Date(order.updatedAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-blue-600 text-white py-2 px-4 w-full h-12 rounded-b-lg font-semibold hover:bg-blue-700 shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  View Order Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-blue-200">No orders to show</h1>
        )}
      </div>

      <div className="fixed bottom-4 left-0 right-0 mx-auto flex justify-center bg-blue-900 p-2 sm:p-3 rounded-full shadow-lg max-w-full w-[90%] sm:w-max transition-transform duration-300 hover:scale-105 gap-1 sm:gap-2">
        {["all", "localization", "contract_manufacturing", "supply_chain"].map(
          (type) => (
            <button
              key={type}
              className={`py-1 px-2 sm:py-2 sm:px-4 mx-1 rounded-full font-semibold text-xs sm:text-base transition-transform duration-300 ease-in-out ${
                selectedOrderType === type
                  ? "bg-blue-600 text-white scale-110 shadow-lg"
                  : "bg-blue-700 text-blue-200"
              }`}
              onMouseEnter={() => setSelectedOrderType(type)}
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
