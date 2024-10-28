import useAxios from "./useAxios.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useVendorLogin = () => {
  const axios=useAxios();
  const navigate=useNavigate();
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vendorLogin = async (GSTIN, password) => {
    setLoading(true);
    console.log("Inside vendorLogin");
    try {
      const res = await axios.post(`/vendor/login`, {
        GSTIN,
        password,
      });
      setAuth({
        userType: "vendor",
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
      toast.success("Login Successful")
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { vendorLogin, error, loading };
};
