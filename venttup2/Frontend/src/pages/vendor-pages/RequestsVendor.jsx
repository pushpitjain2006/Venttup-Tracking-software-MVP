import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios.js";
import { toast } from "react-toastify";
import { GiFactory } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";

const OrderRequestPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.post("/vendor/get-vendor-orders", {
        filter: { currentStatus: "Vendor Assigned" },
      });
      setOrders(res.data);
    };
    fetchData();
  }, [axios, count]);

  const handleAccept = async (id) => {
    const res = await axios.post("/vendor/accept-order", { orderId: id });
    if (res.status === 200) {
      toast.success("Order accepted successfully");
    } else {
      toast.error("Failed to accept order");
    }
    setCount(count + 1);
  };

  const handleDecline = async (id) => {
    const res = await axios.post("/vendor/decline-order", { orderId: id });
    if (res.status === 200) {
      toast.success("Order declined successfully");
    } else {
      toast.error("Failed to decline order");
    }
    setCount(count + 1);
  };

  const handleClickOnName = (id) => {
    setCount(count + 1);
  };
  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
    setCount(count + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-gray-100 to-green-100 p-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-green-700 font-semibold hover:text-green-900 transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <div className="flex items-center space-x-2 mb-6">
        <GiFactory className="text-green-600 w-8 h-8" />
        <h1 className="text-3xl font-bold text-green-900">Order Requests</h1>
      </div>
      <div className="space-y-6">
        {orders.length ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <FiUser className="text-green-600" />
                  <h2
                    onClick={() => handleClickOnName(order._id)}
                    className="text-lg font-semibold text-green-800 cursor-pointer hover:underline"
                  >
                    {order.customerId}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAccept(order._id)}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
                  >
                    <AiOutlineCheck />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleDecline(order._id)}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
                  >
                    <AiOutlineClose />
                    <span>Decline</span>
                  </button>
                  <button
                    onClick={() => handleViewDetails(order._id)}
                    className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                  >
                    <AiOutlineCheck />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
              <div className="text-gray-700">
                <p>
                  <strong>Order Type:</strong> {order.orderType}
                </p>
                <p>
                  <strong>Sector:</strong> {order.sector}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>Current Step:</strong> {order.currentStep}
                </p>
                <p>
                  <strong>Status:</strong> {order.currentStatus}
                </p>
                <p>
                  <strong>Admin Approval:</strong>{" "}
                  {order.adminApproval ? "Approved" : "Pending"}
                </p>
                <p>
                  <strong>Vendor ID:</strong>{" "}
                  {order.vendorId || "No vendor assigned"}
                </p>
                <p>
                  <strong>Comments:</strong> {order.comments || "No comments"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No orders requested</p>
        )}
      </div>
    </div>
  );
};

export default OrderRequestPage;
