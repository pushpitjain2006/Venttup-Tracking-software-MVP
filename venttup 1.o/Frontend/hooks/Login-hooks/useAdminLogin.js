import useAxios from "../../src/utils/useAxios.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

export const useAdminLogin = () => {
  const axios = useAxios();
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`/admin/login`, {
        username,
        password,
      });
      setAuth({
        userType: "admin",
        token: res.data.token,
        userId: res.data.userId,
      });
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
