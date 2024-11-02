import { useParams } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ChevronLeft } from "lucide-react";
import OrderProgress from "../../components/AdminDashboard/OrderProgress";

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/admin/order/${orderId}`);
        setDetails(response.data);
        setUpdates(details);
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
        <>
          <div className="w-full p-4 bg-gray-700 rounded-lg my-4 shadow-lg transition-all duration-300 ease-in-out">
            <button
              onClick={() => setShowOrderDetails((prev) => !prev)}
              className="w-full text-left font-bold text-xl bg-gray-800 py-2 px-4 rounded-md text-gray-200 hover:bg-gray-600"
            >
              {showOrderDetails ? "▾ Hide Details" : "▸ View Order Details"}
            </button>
            {showOrderDetails && (
              <div className="overflow-hidden transition-all duration-300 ease-in-out mt-4">
                <div className="space-y-4 grid grid-cols-2">
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Order ID</h3>
                    <p className="text-gray-400">{details._id}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Customer ID</h3>
                    <p className="text-gray-400">{details.customerId}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Order Type</h3>
                    {isEditing ? (
                      <select
                        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={updates?.orderType || details.orderType}
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
                      <p className="text-gray-400">{details.orderType}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Total Amount</h3>
                    {isEditing ? (
                      <input
                        type="number"
                        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={updates?.totalAmount || details.totalAmount}
                        onChange={(e) =>
                          handleChange("totalAmount", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-gray-400">₹{details.totalAmount}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Current Status</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={updates?.currentStatus || details.currentStatus}
                        onChange={(e) =>
                          handleChange("currentStatus", e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-gray-400">{details.currentStatus}</p>
                    )}
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
                    {isEditing ? (
                      <input
                        type="text"
                        className="p-2 rounded bg-gray-700 text-white focus:outline-none"
                        value={updates?.sector || details.sector}
                        onChange={(e) => handleChange("sector", e.target.value)}
                      />
                    ) : (
                      <p className="text-gray-400">{details.sector}</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Admin Approval</h3>
                    {isEditing ? (
                      <button
                        type="checkbox"
                        checked={updates?.adminApproval}
                        onClick={(e) =>
                          handleChange("adminApproval", !e.target.checked)
                        }
                        className={`h-10 w-28 rounded-lg font-medium 
                          ${
                            updates?.adminApproval
                              ? "bg-red-600"
                              : "bg-green-600"
                          }`}
                      >
                        {updates?.adminApproval ? "Disapprove" : "Approve"}
                      </button>
                    ) : (
                      <p className="text-gray-400">
                        {details.adminApproval ? "Approved" : "Pending"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  {!details.adminApproval && (
                    <button
                      className="m-4 focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={handleApproveUpdate}
                    >
                      Approve Update
                    </button>
                  )}
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
            )}
          </div>

          <div className="w-full p-4 bg-gray-700 rounded-lg my-4 shadow-lg transition-all duration-300 ease-in-out">
            <button
              onClick={() => setShowOrderProgress((prev) => !prev)}
              className="w-full text-left font-bold text-xl bg-gray-800 py-2 px-4 rounded-md text-gray-200 hover:bg-gray-600"
            >
              {showOrderProgress ? "▾ Hide Progress" : "▸ View Order Progress"}
            </button>
            {showOrderProgress && (
              <div className="overflow-hidden transition-all duration-300 ease-in-out mt-4">
                <OrderProgress order={details} />
              </div>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-red-600">Order not found.</h1>
      )}
    </div>
  );
};

export default OrderDetails;
