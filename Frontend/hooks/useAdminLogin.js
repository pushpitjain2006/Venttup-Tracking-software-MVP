import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../src/utils/api.js";

export const useAdminLogin = () => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminLogin = async (username, password) => {
    setLoading(true);
    try {
      console.log("Inside adminLogin");
      // const backendURL = process.env.REACT_APP_BackendURL || "http://localhost:3001";
      // console.log("backendURL : ", backendURL);
      const res = await api.post(`/admin/login`, {
        username,
        password,
      });
      console.log(res);
      setAuth({
        userType: "admin",
        token: res.data.token,
        userId: res.data.userId,
      });
      console.log("auth : ", auth);
      setError(null);

      toast.success("Login successful");
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { adminLogin, error, loading };
};
