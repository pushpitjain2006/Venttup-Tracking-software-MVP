import React, { useEffect } from "react";
import useAxios from "../utils/useAxios.js";

const GateDetails = (order, CurrentStatus) => {
  const axios = useAxios();
  const [vendor, setVendor] = useState(null);

  const fetchVendor = async () => {
    try {
      const res = await axios.get(`/vendor-details`, {
        params: {
          VendorId: order.vendorId,
        },
      });
      setVendor(res.data);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };
  useEffect(() => {
    fetchVendor();
  }, [CurrentStatus]);

  return (<div>
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold">Gate Details</h2>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Gate Name:</span>
            <span>{vendor?.name}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Gate Address:</span>
            <span>{vendor?.address}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="font-semibold">Gate Contact:</span>
            <span>{vendor?.contact}</span>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default GateDetails;
