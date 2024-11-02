import React, { useState } from "react";
import { useVendorLogin } from "../../../hooks/Login-hooks/useVendorLogin";
import { toast } from "react-toastify";

const VendorLogin = () => {
  const [password, setPassword] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const { vendorLogin, error, loading } = useVendorLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!GSTIN || !password) {
      toast("Please fill all the fields");
      return;
    }
    vendorLogin(GSTIN, password);
  }
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        Vendor Login
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center items-center">
        <div className="space-y-2 w-full">
          <label
            htmlFor="GSTIN"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            GSTIN
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="GSTIN"
            type="text"
            placeholder="22AAAAA0000A1Z5"
            value={GSTIN}
            onChange={(e) => setGSTIN(e.target.value)}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default VendorLogin;
