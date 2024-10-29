import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";
import DetailCard from "../../components/AdminDashboard/DetailCard";

const OrderDetails = () => {
  const axios = useAxios();
  const { orderId } = useParams();
  const [details, setDetails] = useState(null);
  const [showVendorInput, setShowVendorInput] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updates, setUpdates] = useState({});

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
  }, [axios]);

  const handleAssignVendor = async () => {
    if (!vendorId.trim()) {
      toast.error("Vendor ID cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`/admin/assign-vendor`, { orderId, vendorGSTIN: vendorId });
      setDetails((prev) => ({ ...prev, vendorId: response.data.vendorId }));
      setShowVendorInput(false);
      toast.success("Vendor assigned successfully");
    } catch (err) {
      toast.error("Failed to assign vendor");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(`/admin/delete-order`, { data: { orderId } });
      setDetails(null);
      toast.success("Order deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete order.");
    }
  };

  const handleEditDetails = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateOrder = async () => {
    try {
      await axios.put(`/admin/modify-order`, { orderId, updates });
      setIsEditing(false);
      setDetails((prev) => ({ ...prev, ...updates }));
      toast.success("Order updated successfully");
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  const handleChange = (field, value) => {
    setUpdates((prev) => ({ ...prev, [field]: value }));
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
        {details ? (
          <div className="w-full mx-auto bg-slate-600 shadow-lg p-8 text-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6">Order Details</h2>

            <DetailCard 
              isEditing={isEditing} 
              details={details} 
              updates={updates}
            />
            <div className="flex justify-end items-center">
              {isEditing ? (
                <button
                  className="m-4 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleUpdateOrder}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="m-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleEditDetails}
                >
                  Edit Details
                </button>
              )}
              <button
                className="m-4 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleDeleteOrder}
              >
                Delete Order
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-red-600">Order not found.</h1>
        )}
      </div>
    </>
  );
};

export default OrderDetails;