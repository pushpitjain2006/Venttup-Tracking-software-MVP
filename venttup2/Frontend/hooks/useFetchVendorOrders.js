import { useState, useEffect } from "react";
import useAxios from "../src/utils/useAxios.js";

const useFetchVendorOrders = () => {
  const axios = useAxios();
  const [vendorOrders, setVendorOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVendorOrders = async () => {
    try {
      const res = await axios.post("/vendor/get-vendor-orders");
      console.log(res.data);
      setVendorOrders(res.data);
      setError(null);
    } catch (err) {
      setError("Error fetching vendor orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  return { vendorOrders, error, loading, reload: fetchVendorOrders };
};

export default useFetchVendorOrders;
