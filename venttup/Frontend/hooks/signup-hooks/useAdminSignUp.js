import useAxios from "../../src/utils/useAxios.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export const useAdminSignup = () => {
  const { auth } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminSignup = async (username, password, confirmPassword) => {
    if (auth.userType !== "admin") {
      toast.error("You are not authorized to signup a new admin");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`/admin/signup`, {
        username,
        password,
        confirmPassword,
      });
      setError(null);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed");
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { adminSignup, error, loading };
};
