import React, { useState } from "react";
import { useAdminLogin } from "../../../hooks/Login-hooks/useAdminLogin.js";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const { adminLogin, error, loading } = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (!username || !password) {
        toast.warn("Please fill all the fields");
        return;
      }
      adminLogin(username, password);
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in");
    }
  };

  const handleTryWebsite = (e) => {
    e.preventDefault();
    setUsername("john_doe");
    setPassword("StrongPassword123!");
    try {
      if (!username || !password) {
        toast.warn("Please fill all the fields");
        return;
      }
      adminLogin(username, password);
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Admin Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex-col flex justify-center items-center"
      >
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
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="bg-gray-50 backdrop-blur-lg border border-green-400 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-green-500 focus:border-green-500 pr-10"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300"
          disabled={loading}
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleTryWebsite}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-300 mt-4"
        >
          Try the Website
        </button>
      </form>
    </>
  );
};

export default AdminLogin;
