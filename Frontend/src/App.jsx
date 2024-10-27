import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import MasterDashboard from "../pages/Dashboard/AdminDashboard/masterDashboard.jsx";
import customerDashboard from "../pages/Dashboard/customerDashboard/customerDashboard.jsx";
import vendorDashboard from "../pages/Dashboard/VedorDashboard/vendorDashboard.jsx";

function Redirect({ page }) {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  if (auth.token) {
    const userType = auth.userType;
    if (userType == "admin") {
      return <MasterDashboard />;
    } else if (userType == "customer") {
      return <customerDashboard />;
    } else if (userType == "vendor") {
      return <vendorDashboard />;
    } else {
      console.log(auth);
      setAuth(null);
      localStorage.removeItem("auth");
      console.log(auth);
      console.log("Invalid user type");
      if (page === "signup") {
        return <div>signup page</div>;
      }
      return <Login />;
    }
  } else {
    if (page === "signup") {
      return <div>op</div>;
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
    element: <Redirect />,
  },
  {
    path: "/signup",
    element: <Redirect page="signup" />,
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
