import React, { useState } from "react";
import { useAdminLogin } from "../../../hooks/Login-hooks/useAdminLogin.js";
import { toast } from "react-toastify";

const Adminlogin = () => {
  const { adminLogin, error, loading } = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast("Please fill all the fields");
      return;
    }
    adminLogin(username, password);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex-col flex justify-center items-center">
        <div className="space-y-2 w-full">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            className="bg-gray-50 backdrop-blur-lg border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="username"
            type="text"
            placeholder="johndoe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2 w-full">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            className="bg-gray-50 backdrop-blur-lg border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Adminlogin;
