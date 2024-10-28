import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export const useVendorSignup = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vendorSignup = async (GSTIN, password, ConfirmPassword, address, contactNumber) => {
    setLoading(true);
    try {
      const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
      const res = await axios.post(`${backendURL}/vendor/signup`, {
        GSTIN,
        password,
        ConfirmPassword,
        address,
        contactNumber
      });
      setAuth({
        userType: "vendor",
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
      redirect("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { vendorSignup, error, loading };
};
