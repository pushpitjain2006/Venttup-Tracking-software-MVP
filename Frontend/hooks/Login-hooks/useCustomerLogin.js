import useAxios from "./useAxios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCustomerLogin = () => {
  const navigate=useNavigate();
  const axios=useAxios();
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerLogin = async (GSTIN, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`/customer/login`, {
        GSTIN: GSTIN,
        password: password,
      });
      setAuth({
        userType: "customer",
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { customerLogin, error, loading };
};
