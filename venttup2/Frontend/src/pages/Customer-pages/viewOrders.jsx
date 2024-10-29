import React, { useEffect, useState } from "react";
import { FaLeaf, FaArrowLeft, FaSync } from "react-icons/fa";
import useFetchOrders from "../../../hooks/useFetchOrders.js";

const ViewOrders = () => {
  const { orders, error, loading } = useFetchOrders();
  const [count, setcount] = useState(0);
  return (
    <div className="min-h-screen bg-[url('/src/assets/sustainable-bg.jpg')] bg-cover bg-opacity-30 p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-green-700 font-semibold flex items-center hover:text-green-800"
          >
            <FaArrowLeft className="mr-2" /> Home
          </button>
          <h1 className="text-2xl font-semibold text-green-700 flex items-center">
            <FaLeaf className="text-3xl mr-2" /> View Orders
          </h1>
          <button
            onClick={() => setcount(count + 1)}
            className="text-green-700 font-semibold flex items-center hover:text-green-800"
          >
            <FaSync className="mr-2" /> Reload
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <div
                key={order.id || index}
                className="p-4 border-2 border-gray-300 rounded-lg shadow hover:shadow-lg hover:border-green-600 transition duration-300"
              >
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Order #{index}
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
