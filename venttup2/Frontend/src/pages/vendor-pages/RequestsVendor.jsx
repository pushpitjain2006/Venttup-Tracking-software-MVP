import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios.js";
import { toast } from "react-toastify";

const OrderRequestPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  // Sample data representing orders from the orderSchema
  const [orders, setOrders] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    console.log("Fetching orders...");
    const fetchData = async () => {
      const res = await axios.post("/vendor/get-vendor-orders", {
        filter: { currentStatus: "Vendor Assigned" },
      });
      console.log(res.data);
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

  const handleDecline = (id) => {
    const res = axios.post("/vendor/decline-order", { orderId: id });
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Requests</h1>
      <div className="space-y-4">
        {orders.length
          ? orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <FiUser className="text-gray-500" />
                    <h2
                      onClick={() => handleClickOnName(order._id)}
                      className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                    >
                      {order.customerId}
                    </h2>
                  </div>
                  <div className="space-x-2 flex">
                    <button
                      onClick={() => handleAccept(order._id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <AiOutlineCheck />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleDecline(order._id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <AiOutlineClose />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => handleViewDetails(order._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Details
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
                    <strong>Total Amount:</strong> ${order.totalAmount}
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
          : "No orders Requested"}
      </div>
    </div>
  );
};

export default OrderRequestPage;
