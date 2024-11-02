import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import MasterDashboard from "./pages/Dashboard/AdminDashboard/masterDashboard.jsx";
import CustomerDashboard from "./pages/Dashboard/customerDashboard/customerDashboard.jsx";
import VendorDashboard from "./pages/Dashboard/VendorDashboard/vendorDashboard.jsx";
import EditUsers from "./components/AdminDashboard/EditUsers.jsx";
import PlaceOrder from "./pages/Customer-pages/placeOrder.jsx";
import ViewOrders from "./pages/Customer-pages/viewOrders.jsx";

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
    path: "ViewOrders",
    element: <ViewOrders />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
