import { createRoot } from "react-dom/client";
import { AuthProvider } from "../context/AuthContext.jsx";
import App from "./App.jsx";
import "./css/tailwind.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer />
    <Analytics />
  </>
);
