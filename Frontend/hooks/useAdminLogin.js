import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const useAdminLogin = () => {
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminLogin = async (username, password) => {
    setLoading(true);
    try {
      // console.log("Inside adminLogin");
      const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
      const res = await axios.post(`${backendURL}/admin/login`, {
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
      redirect("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { adminLogin, error, loading };
};
