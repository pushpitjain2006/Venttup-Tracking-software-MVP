import React, { useState } from "react";
import useFetchUsers from "../../../hooks/useFetchUsers.js";
import useAxios from "../../utils/useAxios.js";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaIndustry,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdVerifiedUser, MdTimer } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EditUsers = () => {
  const axios = useAxios();
  const [userType, setUserType] = useState("vendor");
  const { users, setUsers, loading, error } = useFetchUsers(userType);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleDelete = async (userType, userId) => {
    try {
      const res = await axios.delete(`/admin/delete-user`, {
        data: { type: userType, id: userId },
      });
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user.");
        console.error("Failed to delete user:", res.data.message);
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error("Failed to delete user.");
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditedUserData(user);
  };

  const handleSaveEdit = async () => {
    const res = await axios.put(`/admin/update-user`, {
      type: userType,
      id: editUserId,
      data: editedUserData,
    });
    if (res.status !== 200) {
      console.error("Failed to update user:", res.data.message);
      return toast.error("Failed to update user.");
    }
    setUsers(
      users.map((user) =>
        user._id === editUserId ? { ...user, ...editedUserData } : user
      )
    );
    toast.success("User details updated successfully!");
    setEditUserId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-100 text-gray-900 p-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-600 flex items-center gap-2 hover:text-blue-500 transition"
      >
        <FaArrowLeft />
        Back
      </button>

      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700 flex items-center justify-center gap-2">
        <FaIndustry />
        Edit Users
      </h1>

      {/* User Type Toggle */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setUserType("vendor")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
            userType === "vendor"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          View Vendors
        </button>
        <button
          onClick={() => setUserType("customer")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
            userType === "customer"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          View Customers
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center text-blue-700">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
          <p className="ml-3 text-lg">Loading...</p>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border-l-4 border-blue-500"
          >
            {editUserId === user._id ? (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  value={editedUserData.GSTIN}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      GSTIN: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="GSTIN"
                />
                <input
                  type="text"
                  value={editedUserData.address}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      address: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Address"
                />
                <input
                  type="text"
                  value={editedUserData.contactNumber}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      contactNumber: e.target.value,
                    })
                  }
                  className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Contact Number"
                />
                {userType === "vendor" && (
                  <>
                    <label className="flex items-center gap-2 text-gray-600">
                      <input
                        type="checkbox"
                        checked={editedUserData.available}
                        onChange={(e) =>
                          setEditedUserData({
                            ...editedUserData,
                            available: e.target.checked,
                          })
                        }
                      />
                      Available
                    </label>
                    <input
                      type="number"
                      value={editedUserData.currentOrderCapacity}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          currentOrderCapacity: e.target.value,
                        })
                      }
                      className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Current Order Capacity"
                    />
                  </>
                )}
                <button
                  onClick={handleSaveEdit}
                  className="mt-2 w-full py-2 text-blue-600 bg-blue-200 rounded-lg hover:bg-blue-300 transition-all"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="text-gray-700">
                <p className="font-semibold text-lg text-blue-700 flex items-center gap-2 mb-1">
                  <MdVerifiedUser className="text-blue-500" /> GSTIN:{" "}
                  {user.GSTIN}
                </p>
                <p className="mb-1 flex items-center gap-2">
                  <MdLocationOn className="text-blue-500" /> Address:{" "}
                  {user.address}
                </p>
                <p className="mb-4 flex items-center gap-2">
                  <MdPhone className="text-blue-500" /> Contact:{" "}
                  {user.contactNumber}
                </p>
                {userType === "vendor" && (
                  <>
                    <p className="mb-1 flex items-center gap-2">
                      {user.available ? (
                        <FaCheckCircle className="text-blue-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                      Status: {user.available ? "Available" : "Unavailable"}
                    </p>
                    <p className="mb-4 flex items-center gap-2">
                      <MdTimer className="text-blue-500" /> Capacity:{" "}
                      {user.currentOrderCapacity}
                    </p>
                  </>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="flex-1 py-2 text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all flex items-center gap-2 justify-center"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(userType, user._id)}
                    className="flex-1 py-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200 transition-all flex items-center gap-2 justify-center"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              Created at: {new Date(user.createdAt).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Last Updated at: {new Date(user.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditUsers;
