import React, { useState } from "react";
import { useAdminLogin } from "../../../hooks/Login-hooks/useAdminLogin.js";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const { adminLogin, error, loading } = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warn("Please fill all the fields");
      return;
    }
    adminLogin(username, password);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex-col flex justify-center items-center">
        <div className="space-y-2 w-full">
          <label
            htmlFor="username"
            className="block mb-2 text-lg font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            className="bg-gray-50 backdrop-blur-lg border border-green-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            className="bg-gray-50 backdrop-blur-lg border border-green-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
