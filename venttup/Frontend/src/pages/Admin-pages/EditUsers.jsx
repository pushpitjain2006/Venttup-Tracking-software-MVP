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
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (userType, userId) => {
    try {
      const res = await axios.delete(`/admin/delete-user`, {
        data: { type: userType, id: userId },
      });
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      } else {
        toast.error(res?.data?.message || "Failed to delete user.");
      }
    } catch (err) {
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

  // Filter users based on searchTerm
  const filteredUsers = users.filter(
    (user) =>
      user._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.GSTIN.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.currentOrderCapacity === parseInt(searchTerm) ||
      user.available === (searchTerm.toLowerCase() === "available") ||
      user.available === (searchTerm.toLowerCase() === "not available")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-100 text-gray-900 p-8">
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

      {/* Search input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID, GSTIN, Address, or Contact Number"
          className="w-full md:w-1/2 p-3 rounded-lg bg-blue-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 border-l-4 border-blue-500"
          >
            <p className="text-gray-500 text-sm absolute top-1 right-2">
              ID: {user._id}
            </p>
            {editUserId === user._id ? (
              <div className="flex flex-col gap-3">
                {/* Input fields for editing user data */}
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
                  <div className="flex gap-4 items-center">
                    <p className="flex items-center gap-1">
                      {user.available ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                      <span className="text-sm">
                        {user.available ? "Available" : "Not Available"}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      <MdTimer className="text-blue-500" />
                      <span className="text-sm">
                        Order Capacity: {user.currentOrderCapacity}
                      </span>
                    </p>
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="pl-3 pr-2.5 py-2 bg-yellow-200 text-yellow-700 rounded-lg hover:bg-yellow-300 transition-all"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(userType, user._id)}
                    className="px-3 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 transition-all"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditUsers;
