import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../src/utils/api.js";

export const useAdminSignup = () => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminSignup = async (username, password, confirmPassword) => {
    setLoading(true);
    try {
      // const backendURL = process.env.REACT_APP_BackendURL || "http://localhost:3001";
      const res = await api.post(`/admin/signup`, {
        username,
        password,
        confirmPassword
      });
      
      console.log(res);
      setAuth({
        userType: "admin",
        token: res.token,
        userId: res.userId,
      });
      console.log("auth : ", auth);
      setError(null);
      toast.success("Signup successful");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { adminSignup, error, loading };
};
