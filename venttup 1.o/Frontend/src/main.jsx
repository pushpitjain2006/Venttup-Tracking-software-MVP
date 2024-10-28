import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../context/AuthContext.jsx";
import App from "./App.jsx";
import "./css/tailwind.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>
      <App />
    </AuthProvider>

    <ToastContainer />
  </StrictMode>
);