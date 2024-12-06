import { useEffect, useState } from "react";
import useAxios from "../src/utils/useAxios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const useFetchOrders = () => {
  const { auth } = useAuth();
  const axios = useAxios();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint =
          auth.userType === "admin"
            ? "/admin/view-orders"
            : auth.userType === "vendor"
            ? "/vendor/get-vendor-orders"
            : "/customer/view-orders";

        const response = await axios.get(endpoint);
        setOrders(response.data);
      } catch (err) {
        toast.error("Something went wrong");
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axios, auth]);

  return { orders, loading, error };
};

export default useFetchOrders;
