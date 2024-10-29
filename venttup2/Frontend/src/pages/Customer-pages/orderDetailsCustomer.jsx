import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import useAxios from "../../utils/useAxios.js";
import orderStatuses from "../../config/orderStatusConfig";
import { useParams } from "react-router-dom";

const OrderDetailsCustomer = () => {
  const orderId = useParams().orderId;
  console.log("OrderDetailsCustomer -> ", orderId);
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepDescription, setStepDescription] = useState("");
  const Axios = useAxios();

  useEffect(() => {
    const res = Axios.post("/customer/view-order-details", {
      orderId: orderId,
    }).then((res) => {
      console.log(res);
      setOrder(res.data);
    });
  }, [orderId]);
  const stages = order ? orderStatuses[order.orderType] || [] : [];

  return (
    <div className="order-details-container">
      {/* Top Section */}
      <div className="order-info">
        <button
          onClick={() => (window.location.href = "/orders")}
          className="back-button"
        >
          <FaArrowLeft /> Back to Orders
        </button>
        {order && (
          <div>
            <h2>Order #{orderId}</h2>
            <p>
              <b>Customer:</b> {order.customerName}
            </p>
            <p>
              <b>Vendor:</b> {order.vendorName || "N/A"}
            </p>
            <p>
              <b>Total Amount:</b> ₹{order.totalAmount}
            </p>
          </div>
        )}
      </div>

      {/* Status Section */}
      <div className="status-tracker">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`stage ${
              index <= order.currentStep ? "completed" : "pending"
            }`}
          >
            <div
              className={
                order.orderType === "localization" ? "circle" : "square"
              }
              onClick={() => setStepDescription(stage)}
            />
            {index < stages.length - 1 && <div className="connector" />}
          </div>
        ))}
      </div>

      {/* Step Details */}
      {stepDescription && <p className="step-description">{stepDescription}</p>}
    </div>
  );
};

export default OrderDetailsCustomer;
