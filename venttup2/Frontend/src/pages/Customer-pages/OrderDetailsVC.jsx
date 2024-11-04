import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useAxios from "../../utils/useAxios.js";
import orderStatuses from "../../config/orderStatusConfig.js";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import ProgressBar from "../../components/progressBar.jsx";
import GateDetails from "../../components/GateDetails.jsx";

const OrderDetailsVC = () => {
  const { auth } = useAuth();
  const orderId = useParams().orderId;
  const userType = auth.userType;
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(order?.currentStep);
  const [isSubmissionPending, setIsSubmissionPending] = useState(false);
  const Axios = useAxios();

  const fetchData = async () => {
    try {
      const res = await Axios.post(`/${userType}/view-order-details`, {
        orderId,
      });
      setOrder(res.data);
      setIsSubmissionPending(
        !res.data.adminApproval && res.data.currentStep > 0
      );
      setCurrentStep(res.data.currentStep);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);

  const handleUpdate = async () => {
    if (userType !== "vendor") {
      return;
    }
    try {
      const res = await Axios.post("/vendor/update-progress", {
        orderId,
        action: isSubmissionPending ? "withdraw" : "update",
      });
      if (res.status === 200) {
        setIsSubmissionPending(!isSubmissionPending);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-3xl space-y-4 sm:space-y-6">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="flex items-center text-green-700 font-semibold hover:text-green-900 transition duration-300 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        {order && (
          <div className="text-center space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-green-800">
              Order #{orderId}
            </h2>
            <p className="text-gray-600">
              <span className="font-semibold">Customer:</span>{" "}
              {order.customerName}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Vendor:</span>{" "}
              {order.vendorId || "N/A"}
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

            {userType === "vendor" &&
              order.currentStatus != "Order completed" && (
                <button
                  onClick={handleUpdate}
                  className={`mt-4 px-4 py-2 rounded-lg text-white transition duration-300 text-sm sm:text-base ${
                    isSubmissionPending
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isSubmissionPending
                    ? "Withdraw Submission"
                    : "Update Progress"}
                </button>
              )}
            {userType === "customer" && order.currentStatus === "GRN" && (
              <button
                onClick={async () => {
                  try {
                    const res = await Axios.post("/customer/approve-grn", {
                      orderId,
                    });
                    if (res.status === 200) {
                      fetchData();
                    }
                  } catch (error) {
                    console.error("Error approving GRN:", error);
                  }
                }}
                className="mt-4 px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-sm sm:text-base"
              >
                Approve GRN
              </button>
            )}
          </div>
        )}
      </div>
      {/* Status Tracker */}
      <div className="mt-6 sm:mt-8 w-full max-w-3xl px-4">
        {order && (
          <ProgressBar
            order={order}
            setCurrentStep={setCurrentStep}
            isSubmissionPending={isSubmissionPending}
          />
        )}
      </div>

      {/* Current Step Details */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-3xl mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        {order && orderStatuses[order.orderType][currentStep] && (
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 text-center">
            {orderStatuses[order.orderType][currentStep]}
          </h2>
        )}

        {/* Vendor Details */}
        {/* {order &&
          userType === "customer" &&
          GateDetails(order, currentStep)} */}
      </div>
    </div>
  );
};

export default OrderDetailsVC;
