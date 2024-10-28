import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { redirect } from "react-router-dom";

export const useCustomerSignup = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerSignup = async (GSTIN, password, ConfirmPassword, address, contactNumber) => {
    setLoading(true);
    try {
      const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
      const res = await axios.post(`${backendURL}/customer/signup`, {
        GSTIN: GSTIN,
        password: password,
        ConfirmPassword,
        address,
        contactNumber
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
      setError(err.response?.data?.message || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerSignup, error, loading };
};
