import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export const useCustomerLogin = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerLogin = async (GSTIN, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.BackendURL}/customer/login`, { GSTIN, password });
      setAuth({
        userType: 'customer',
        token: res.data.token,
        userId: res.data.userId,
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { customerLogin, error, loading };
};