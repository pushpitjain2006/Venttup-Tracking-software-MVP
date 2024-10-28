import React, { useState } from "react";
import useFetchUsers from "../../../hooks/useFetchUsers";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const EditUsers = () => {
  const axios=useAxios();
  const [userType, setUserType] = useState("vendor");
  const { users, setUsers, loading, error } = useFetchUsers(userType);
  console.log(users);
  const handleDelete = async (userType,userId) => {
    try {
      console.log(userType,userId);
      const res=await axios.delete(`/admin/delete-user`, {
        data:{
          type:userType,
          id:userId
        }
      });
      // Update users state after deletion
      setUsers(users.filter(user => user._id !== userId));
      toast("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast("Failed to delete user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Users</h1>

      <div className="mb-4">
        <button
          onClick={() => setUserType("vendor")}
          className={`px-4 py-2 mr-2 rounded ${
            userType === "vendor" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          View Vendors
        </button>
        <button
          onClick={() => setUserType("customer")}
          className={`px-4 py-2 rounded ${
            userType === "customer" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          View Customers
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800 font-semibold">GSTIN: {user.GSTIN}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <p className="text-gray-600">Contact: {user.contactNumber}</p>
            </div>
            <button
              onClick={() => handleDelete(userType,user._id)}
              className="text-red-500 bg-red-100 px-3 py-1 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditUsers;
