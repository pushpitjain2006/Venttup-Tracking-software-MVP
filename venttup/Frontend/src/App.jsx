import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "./components/Redirect";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import MainLayout from "./routes/MainLayout.jsx";

const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));
const CustomerRoutes = lazy(() => import("./routes/CustomerRoutes"));
const VendorRoutes = lazy(() => import("./routes/VendorRoutes"));

function App() {
  const { auth } = useAuth();

  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex justify-center items-center text-blue-400">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
            <p className="ml-3 text-lg">Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Redirect page="" />} />
            <Route path="/login" element={<Redirect page="login" />} />
            <Route path="/signup" element={<Redirect page="signup" />} />

            {auth.token && auth.userType === "admin" && (
              <Route path="/*" element={<AdminRoutes />} />
            )}
            {auth.token && auth.userType === "customer" && (
              <Route path="/*" element={<CustomerRoutes />} />
            )}
            {auth.token && auth.userType === "vendor" && (
              <Route path="/*" element={<VendorRoutes />} />
            )}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
