import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "../pages/Dashboard/customerDashboard/customerDashboard";
import PlaceOrder from "../pages/Customer-pages/placeOrder";
import ViewOrders from "../pages/Customer-pages/viewOrders";
import OrderDetailsCustomer from "../pages/Customer-pages/OrderDetailsCustomer.jsx";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/PlaceOrder" element={<PlaceOrder />} />
      <Route path="/ViewOrders" element={<ViewOrders />} />
      <Route
        path="/order-details/:orderId"
        element={<OrderDetailsCustomer />}
      />
    </Routes>
  );
};

export default CustomerRoutes;
