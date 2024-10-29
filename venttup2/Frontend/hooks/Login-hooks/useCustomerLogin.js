import useAxios from "../../src/utils/useAxios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCustomerLogin = () => {
  const navigate = useNavigate();
  const axios = useAxios();
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
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerLogin, error, loading };
};
