import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useAxios from "../../utils/useAxios";
import orderStatuses from "../../config/orderStatusConfig";
import { useParams } from "react-router-dom";
import ProgressBar from "../../components/progressBar";
import GateDetails from "../../components/GateDetails";

const OrderDetailsCustomer = () => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(order?.currentStep);
  const Axios = useAxios();

  const fetchData = async () => {
    try {
      const res = await Axios.post("/customer/view-order-details", {
        orderId,
      });
      setOrder(res.data);
      setCurrentStep(res.data.currentStep);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-green-100 p-4 sm:p-6 flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-5xl space-y-4 sm:space-y-6">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="flex items-center text-green-700 font-semibold hover:text-green-900 transition duration-300 mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        {order && orderStatuses[order.orderType][currentStep] && (
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 text-center">
            {orderStatuses[order.orderType][currentStep]}
          </h2>
        )}
        {order && GateDetails({ stepNumber: currentStep, order: order })}
      </div>

      <div className="mt-6 sm:mt-8 w-full max-w-5xl px-4">
        {order && <ProgressBar order={order} setCurrentStep={setCurrentStep} />}
      </div>
      {order?.currentStatus === "GRN" && (
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
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-3xl mt-6 sm:mt-8 space-y-4 sm:space-y-6">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsCustomer;
