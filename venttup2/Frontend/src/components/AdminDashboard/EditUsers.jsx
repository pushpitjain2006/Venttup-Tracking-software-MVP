import React, { useState } from "react";
import useFetchUsers from "../../../hooks/useFetchUsers";
import useAxios from "../../utils/useAxios.js";
import { toast } from "react-toastify";

const EditUsers = () => {
  const axios = useAxios();
  const [userType, setUserType] = useState("vendor");
  const { users, setUsers, loading, error } = useFetchUsers(userType);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const handleDelete = async (userType, userId) => {
    try {
      const res = await axios.delete(`/admin/delete-user`, {
        data: {
          type: userType,
          id: userId,
        },
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

  const handleSaveEdit = () => {
    console.log("Edited user data:", editedUserData);
    toast.success("User details updated successfully!");
    setEditUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-500 underline transition hover:text-blue-400"
      >
        Back
      </button>

      <h1 className="text-4xl font-bold mb-6 text-center text-blue-300">
        Edit Users
      </h1>

      {/* User Type Toggle */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setUserType("vendor")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
            userType === "vendor"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          View Vendors
        </button>
        <button
          onClick={() => setUserType("customer")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
            userType === "customer"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
          }`}
        >
          View Customers
        </button>
      </div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="relative bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105"
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
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                  className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Contact Number"
                />
                <button
                  onClick={handleSaveEdit}
                  className="mt-2 w-full py-2 text-green-600 bg-green-200 rounded-lg hover:bg-green-300 transition-all"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="text-gray-300">
                <p className="font-semibold text-lg text-blue-400 mb-1">
                  GSTIN: {user.GSTIN}
                </p>
                <p className="mb-1">Address: {user.address}</p>
                <p className="mb-4">Contact: {user.contactNumber}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="flex-1 py-2 text-blue-500 bg-blue-200 rounded-lg hover:bg-blue-300 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(userType, user._id)}
                    className="flex-1 py-2 text-red-500 bg-red-200 rounded-lg hover:bg-red-300 transition-all"
                  >
                    Delete
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
