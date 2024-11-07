import React from "react";
import { Routes, Route } from "react-router-dom";
import MasterDashboard from "../pages/Dashboard/AdminDashboard/masterDashboard";
import EditUsers from "../pages/Admin-pages/EditUsers";
import OrderUploadForm from "../pages/Admin-pages/OrderUpload";
import AllOrderDetails from "../pages/Admin-pages/ViewOrders";
import OrderDetails from "../pages/Admin-pages/OrderDetails";
import Signup from "../pages/Signup/Signup.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<MasterDashboard />} />
      <Route path="/view-users" element={<EditUsers />} />
      <Route path="/upload-order" element={<OrderUploadForm />} />
      <Route path="/admin/ViewOrders" element={<AllOrderDetails />} />
      <Route path="/order/:orderId" element={<OrderDetails />} />
      <Route path="/Admin-signup" element={<Signup />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AdminRoutes;
