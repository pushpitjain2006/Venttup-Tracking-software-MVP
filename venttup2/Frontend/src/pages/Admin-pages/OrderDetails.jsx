import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";
import OrderProgress from "../../components/AdminDashboard/OrderProgress";
import orderStatuses from "../../config/orderStatusConfig.js";

const OrderDetails = () => {
  const axios = useAxios();
  const { orderId } = useParams();
  const [details, setDetails] = useState(null);
  const [showVendorInput, setShowVendorInput] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updates, setUpdates] = useState({});
  const [showOrderDetails, setShowOrderDetails] = useState(true);
  const [showOrderProgress, setShowOrderProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const Statuses = orderStatuses[details?.orderType] || [];

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/admin/order/${orderId}`);
        setDetails(response.data);
        setUpdates(details);
      } catch (err) {
        toast.error("Cannot fetch details");
      } finally {
        setLoading(false);
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
      const response = await axios.post(`/admin/assign-vendor`, {
        orderId,
        vendorGSTIN: vendorId,
      });
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
      window.history.back();
    } catch (err) {
      toast.error("Failed to delete order.");
    }
  };

  const handleEditDetails = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateOrder = async () => {
    try {
      const res = await axios.put("/admin/modify-order", { orderId, updates });
      setIsEditing(false);
      setDetails((prev) => ({ ...prev, ...updates }));
      toast.success("Order updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update order");
    }
  };

  const handleChange = (field, value) => {
    if (field === "currentStep" && value < Statuses.length) {
      setUpdates((prev) => ({ ...prev, ["currentStatus"]: Statuses[value] }));
    }
    setUpdates((prev) => ({ ...prev, [field]: value || "" }));
  };

  const handleApproveUpdate = async () => {
    try {
      await axios.post(`/admin/approve-update`, { orderId });
      setDetails((prev) => ({ ...prev, adminApproval: true }));
      toast.success("Order approved successfully");
    } catch (err) {
      toast.error("Failed to approve order");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-gray-100 to-blue-50 text-gray-800">
      <div className="w-full h-16 bg-blue-700 flex items-center px-4">
        <div
          className="hover:underline hover:text-blue-700 hover:bg-blue-100 transition-colors px-2 h-8 cursor-pointer"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="inline-block" /> View All Orders
        </div>
      </div>

      {details ? (
        <>
          <div className="w-full p-6 bg-white bg-opacity-70 rounded-lg my-4 transition-all duration-300 ease-in-out">
            <div className="w-full p-4 bg-opacity-70 rounded-lg">
              <div className="overflow-hidden mt-4">
                <OrderProgress order={details} />
              </div>
            </div>

            <div
              onClick={() => setShowOrderDetails((prev) => !prev)}
              className="w-full text-left font-semibold text-xl bg-blue-600 py-2 px-4 rounded-md text-gray-50 hover:bg-blue-500 transition-all duration-200"
            >
              Order Details
            </div>

            <div className="overflow-hidden mt-4">
              <div className="space-y-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Order ID</h3>
                  <p className="text-gray-500">{details._id}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Customer ID</h3>
                  <p className="text-gray-500">{details.customerId}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Order Type</h3>
                  {isEditing ? (
                    <select
                      className="p-2 rounded bg-gray-200 text-gray-700 focus:outline-none"
                      value={updates?.orderType ?? details.orderType}
                      onChange={(e) =>
                        handleChange("orderType", e.target.value)
                      }
                    >
                      <option value="localization">Localization</option>
                      <option value="contract_manufacturing">
                        Contract Manufacturing
                      </option>
                      <option value="supply_chain">Supply Chain</option>
                    </select>
                  ) : (
                    <p className="text-gray-500">{details.orderType}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">Total Amount</h3>
                  {isEditing ? (
                    <input
                      type="number"
                      className="p-2 bg-gray-200 text-gray-700 focus:outline-none"
                      value={updates?.totalAmount ?? details.totalAmount}
                      onChange={(e) =>
                        handleChange("totalAmount", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-500">₹{details.totalAmount}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">Current Status</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      className="p-2 bg-gray-200 text-gray-700 focus:outline-none"
                      value={updates?.currentStatus ?? details.currentStatus}
                      onChange={(e) =>
                        handleChange("currentStatus", e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-gray-500">{details.currentStatus}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">Current Step</h3>
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        className="p-2 bg-gray-200 text-gray-700 focus:outline-none"
                        value={updates?.currentStep ?? details.currentStep}
                        onChange={(e) =>
                          handleChange("currentStep", e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <p className="text-gray-500">{details.currentStep}</p>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">Vendor ID</h3>
                  <div className="text-gray-500">
                    {details.vendorId ? (
                      details.vendorId
                    ) : showVendorInput ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Enter Vendor ID"
                          className="p-2 bg-gray-200 text-gray-700 focus:outline-none"
                          value={vendorId}
                          onChange={(e) => setVendorId(e.target.value)}
                        />
                        <button
                          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded px-4 py-2"
                          onClick={handleAssignVendor}
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      <button
                        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded px-4 py-2"
                        onClick={() => setShowVendorInput(true)}
                      >
                        Assign Vendor
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center space-x-4 mt-6">
                {!details.adminApproval && (
                  <button
                    className="text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded px-4 py-2"
                    onClick={handleApproveUpdate}
                  >
                    Approve Update
                  </button>
                )}
                {isEditing ? (
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded px-4 py-2"
                    onClick={handleUpdateOrder}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded px-4 py-2"
                    onClick={handleEditDetails}
                  >
                    Edit Details
                  </button>
                )}
                <button
                  className="text-white bg-red-600 hover:bg-red-700 font-medium rounded px-4 py-2"
                  onClick={handleDeleteOrder}
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </>
      ) : loading ? (
        <h1 className="text-blue-600">Loading...</h1>
      ) : (
        <h1 className="text-red-500">Order not found.</h1>
      )}
    </div>
  );
};

export default OrderDetails;
