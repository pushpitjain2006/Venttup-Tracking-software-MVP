import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios.js";
import { FaLeaf, FaArrowLeft } from "react-icons/fa";

const ViewOrders = () => {
  const axios = useAxios();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/customer/view-orders");
        if (res.status === 200) {
          setOrders(res.data);
        } else {
          console.error(res);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [axios]);

  return (
    <div className="min-h-screen bg-[url('/src/assets/sustainable-bg.jpg')] bg-cover bg-opacity-30 p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Navbar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-green-700 font-semibold flex items-center hover:text-green-800"
          >
            <FaArrowLeft className="mr-2" /> Home/Back
          </button>
          <h1 className="text-2xl font-semibold text-green-700 flex items-center">
            <FaLeaf className="text-3xl mr-2" /> View Orders
          </h1>
        </div>

        {/* Orders List */}
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
