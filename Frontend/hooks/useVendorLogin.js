import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import api from "../src/utils/api.js";

export const useVendorLogin = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vendorLogin = async (GSTIN, password) => {
    setLoading(true);
    console.log("Inside vendorLogin");
    try {
      const res = await api.post(`/vendor/login`, {
        GSTIN,
        password,
      });
      setAuth({
        userType: "vendor",
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { vendorLogin, error, loading };
};
