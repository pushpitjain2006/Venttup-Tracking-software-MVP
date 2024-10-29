import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";

const OrderDetails = () => {
  const axios = useAxios();
  const { orderId } = useParams();
  const [details, setDetails] = useState({});
  const [showVendorInput, setShowVendorInput] = useState(false);
  const [vendorId, setVendorId] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/admin/order/${orderId}`);
        setDetails(response.data);
        toast.success("Fetched successfully");
      } catch (err) {
        toast.error("Cannot fetch details");
      }
    };
    fetchDetails();
  }, [axios, orderId]);

  const handleAssignVendor = async () => {
    if (!vendorId.trim()) {
      toast.error("Vendor ID cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`/admin/assign-vendor`, { orderId, vendorGSTIN:vendorId });
      console.log(response.data);
      setDetails((prev) => ({ ...prev, vendorId:response.data.vendorId }));
      setShowVendorInput(false);
      toast.success("Vendor assigned successfully");
    } catch (err) {
      toast.error("Failed to assign vendor");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-gray-100">
        <div className="w-full h-16 bg-violet-900 flex items-center">
          <div
            className="hover:underline hover:text-black hover:bg-white rounded-full px-2 h-8 cursor-pointer mx-2"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="inline-block" /> View All Orders
          </div>
        </div>
        <div className="w-full mx-auto bg-slate-600 shadow-lg p-8 text-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6">Order Details</h2>

          <div className="space-y-4 grid grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Order ID</h3>
              <p className="text-gray-400">{details._id}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Customer ID</h3>
              <p className="text-gray-400">{details.customerId}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Order Type</h3>
              <p className="text-gray-400">{details.orderType}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Total Amount</h3>
              <p className="text-gray-400">₹{details.totalAmount}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Current Status</h3>
              <p className="text-gray-400">{details.currentStatus}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Vendor ID</h3>
              <div className="text-gray-400">
                {details.vendorId ? (
                  details.vendorId
                ) : showVendorInput ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Enter Vendor ID"
                      className="w-1/2 p-2 rounded bg-gray-700 text-white focus:outline-none"
                      value={vendorId}
                      onChange={(e) => setVendorId(e.target.value)}
                    />
                    <button
                      className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={handleAssignVendor}
                    >
                      Assign
                    </button>
                  </div>
                ) : (
                  <button
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => setShowVendorInput(true)}
                  >
                    Assign Vendor
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Sector</h3>
              <p className="text-gray-400">{details.sector}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Admin Approval</h3>
              <p className="text-gray-400">
                {details.adminApproval ? "Approved" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;