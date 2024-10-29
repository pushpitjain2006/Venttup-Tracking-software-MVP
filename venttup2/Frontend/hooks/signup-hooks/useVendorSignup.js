import useAxios from "../../src/utils/useAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useVendorSignup = () => {
  console.log("Inside useVendorSignup");
  const axios = useAxios();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const vendorSignup = async (
    GSTIN,
    password,
    ConfirmPassword,
    address,
    contactNumber
  ) => {
    setLoading(true);
    try {
      const res = await axios.post(`/vendor/signup`, {
        GSTIN,
        password,
        ConfirmPassword,
        address,
        contactNumber,
      });
      setError(null);
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { vendorSignup, error, loading };
};
