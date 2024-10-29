import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useAxios from "../../utils/useAxios.js";
import orderStatuses from "../../config/orderStatusConfig.js";
import { useParams } from "react-router-dom";
import progressBar from "../../components/progressBar.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const OrderDetailsVC = () => {
  const { auth } = useAuth();
  const orderId = useParams().orderId;
  const userType = auth.userType;
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(order?.currentStep || 0);
  const Axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.post(`/${userType}/view-order-details`, {
          orderId: orderId,
        });
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-green-100 p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl space-y-6">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center text-green-700 font-semibold hover:text-green-900 transition duration-300"
        >
          <FaArrowLeft className="mr-2" /> Home
        </button>

        {order && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-800">
              Order #{orderId}
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">Customer:</span>{" "}
              {order.customerName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Vendor:</span>{" "}
              {order.vendorName || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Amount:</span> ₹
              {order.totalAmount}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Sector:</span> {order.sector}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Comments:</span>{" "}
              {order.comments || "No additional comments"}
            </p>
          </div>
        )}
      </div>
      {/* Status Tracker */}
      <div className="mt-8 w-full max-w-3xl">
        {order && progressBar(order, setCurrentStep)}
      </div>

      {/* Current Step Details */}

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl space-y-6">
        {order && orderStatuses[order.orderType][currentStep] && (
          <>
            <h2 className="text-2xl font-bold text-green-800 items-center justify-center">
              {orderStatuses[order.orderType][currentStep]}
            </h2>
            <p className="text-gray-600">
              {orderStatuses[order.orderType][currentStep].description}
            </p>
          </>
        )}

        {/* Vendor Details */}

        {order && order.vendorId && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-800">
              Vendor Details
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">Vendor ID:</span> {order.vendorId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Vendor Name:</span>{" "}
              {order.vendorName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Vendor Phone:</span>{" "}
              {order.vendorPhone}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsVC;
