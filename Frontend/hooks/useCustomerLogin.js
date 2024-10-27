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
      console.log("Inside customerLogin");
      // const backendURL = process.env.REACT_APP_BackendURL || "http://localhost:3001";
      // console.log("backendURL : ", backendURL);
      const res = await axios.post(`http://localhost:3001/customer/login`, {
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
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerLogin, error, loading };
};
