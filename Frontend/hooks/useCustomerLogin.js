import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { redirect } from "react-router-dom";

export const useCustomerLogin = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerLogin = async (GSTIN, password) => {
    setLoading(true);
    try {
      // console.log("Inside customerLogin");
      const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
      const res = await axios.post(`${backendURL}/customer/login`, {
        GSTIN: GSTIN,
        password: password,
      });
      console.log(res);
      setAuth({
        userType: "customer",
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
      redirect("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerLogin, error, loading };
};
