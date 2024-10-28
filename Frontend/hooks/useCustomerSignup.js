import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../src/utils/api.js";

export const useCustomerSignup = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerSignup = async (GSTIN, password, ConfirmPassword, address, contactNumber) => {
    setLoading(true);
    try {
      console.log("Inside customerLogin");
      // const backendURL = process.env.REACT_APP_BackendURL || "http://localhost:3001";
      // console.log("backendURL : ", backendURL);
      const res = await api.post(`/customer/signup`, {
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
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerSignup, error, loading };
};
