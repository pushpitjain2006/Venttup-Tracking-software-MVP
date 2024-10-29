import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const axios = useAxios();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/admin/view-orders");
        setOrders(response.data);
      } catch (error) {
        toast.error("Error fetching orders");
      }
    };
    fetchOrders();
  }, [axios]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Order Details</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-200"
          >
            <h2 className="text-xl font-bold mb-4">Order ID: {order._id}</h2>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-gray-300">Customer ID:</span> {order.customerId}
            </p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
