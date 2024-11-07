import React from "react";
import { Routes, Route } from "react-router-dom";
import VendorDashboard from "../pages/Dashboard/VendorDashboard/vendorDashboard";
import RequestsVendor from "../pages/vendor-pages/RequestsVendor";
import ViewVendorOrders from "../pages/vendor-pages/ViewVendorOrders";
import OrderDetailsVendor from "../pages/vendor-pages/OrderDetailsVendor.jsx";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/vendor/dashboard" element={<VendorDashboard />} />
      <Route path="/ViewRequests" element={<RequestsVendor />} />
      <Route path="/ViewVendorOrders" element={<ViewVendorOrders />} />
      <Route path="/order-details/:orderId" element={<OrderDetailsVendor />} />
    </Routes>
  );
};

export default VendorRoutes;
