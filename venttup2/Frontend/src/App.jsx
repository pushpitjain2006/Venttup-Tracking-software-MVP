import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Lazy load components
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup/Signup.jsx"));
const MasterDashboard = lazy(() =>
  import("./pages/Dashboard/AdminDashboard/masterDashboard.jsx")
);
const CustomerDashboard = lazy(() =>
  import("./pages/Dashboard/customerDashboard/customerDashboard.jsx")
);
const VendorDashboard = lazy(() =>
  import("./pages/Dashboard/VendorDashboard/vendorDashboard.jsx")
);
const EditUsers = lazy(() =>
  import("./components/AdminDashboard/EditUsers.jsx")
);
const PlaceOrder = lazy(() => import("./pages/Customer-pages/placeOrder.jsx"));
const ViewOrders = lazy(() => import("./pages/Customer-pages/viewOrders.jsx"));
const OrderUploadForm = lazy(() =>
  import("./pages/Admin-pages/OrderUpload.jsx")
);
const OrderDetails = lazy(() => import("./pages/Admin-pages/OrderDetails.jsx"));
const AllOrderDetails = lazy(() =>
  import("./pages/Admin-pages/ViewOrders.jsx")
);
const OrderDetailsVC = lazy(() =>
  import("./pages/Customer-pages/OrderDetailsVC.jsx")
);
const RequestsVendor = lazy(() =>
  import("./pages/vendor-pages/RequestsVendor.jsx")
);
const CurrentOrder = lazy(() =>
  import("./pages/vendor-pages/currentOrder.jsx")
);

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
        console.log(auth);
        setAuth(null);
        localStorage.removeItem("auth");
        console.log("Invalid user type");
        return page === "signup" ? <Signup /> : <Login />;
    }
  } else {
    return page === "signup" ? <Signup /> : <Login />;
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
    path: "/UpdateOrder",
    element: <CurrentOrder />,
  },
]);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
