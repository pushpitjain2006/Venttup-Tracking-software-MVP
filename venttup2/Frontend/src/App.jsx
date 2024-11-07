import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import MasterDashboard from "./pages/Dashboard/AdminDashboard/masterDashboard.jsx";
import CustomerDashboard from "./pages/Dashboard/customerDashboard/customerDashboard.jsx";
import VendorDashboard from "./pages/Dashboard/VendorDashboard/vendorDashboard.jsx";
import EditUsers from "./pages/Admin-pages/EditUsers.jsx";
import PlaceOrder from "./pages/Customer-pages/placeOrder.jsx";
import ViewOrders from "./pages/Customer-pages/viewOrders.jsx";
import OrderUploadForm from "./pages/Admin-pages/OrderUpload.jsx";
import OrderDetails from "./pages/Admin-pages/OrderDetails.jsx";
import AllOrderDetails from "./pages/Admin-pages/ViewOrders.jsx";
import OrderDetailsVC from "./pages/Customer-pages/OrderDetailsVC.jsx";
import RequestsVendor from "./pages/vendor-pages/RequestsVendor.jsx";
import ViewVendorOrders from "./pages/vendor-pages/ViewVendorOrders.jsx";

function Redirect({ page }) {
  const { auth, setAuth } = useAuth();
  if (auth.token) {
    const userType = auth.userType;
    switch (userType) {
      case "admin":
        return <MasterDashboard />;
      case "customer":
        return <CustomerDashboard />;
      case "vendor":
        return <VendorDashboard />;
      default:
        setAuth(null);
        localStorage.removeItem("auth");
        if (page === "signup") {
          return <Signup />;
        }
        return <Login />;
    }
  } else {
    if (page === "signup") {
      return <Signup />;
    }
    return <Login />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Redirect page="" />,
  },
  {
    path: "/login",
    element: <Redirect page="login" />,
  },
  {
    path: "/signup",
    element: <Redirect page="signup" />,
  },
  {
    path: "/view-users",
    element: <EditUsers />,
  },
  {
    path: "/PlaceOrder",
    element: <PlaceOrder />,
  },
  {
    path: "/ViewOrders",
    element: <ViewOrders />,
  },
  {
    path: "/upload-order",
    element: <OrderUploadForm />,
  },
  {
    path: "/admin/ViewOrders",
    element: <AllOrderDetails />,
  },
  {
    path: "/order/:orderId",
    element: <OrderDetails />,
  },
  {
    path: "/order-details/:orderId",
    element: <OrderDetailsVC />,
  },
  {
    path: "/ViewRequests",
    element: <RequestsVendor />,
  },
  {
    path: "/ViewVendorOrders",
    element: <ViewVendorOrders />,
  },
  {
    path: "/Admin-signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
