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
      toast.warn("Please fill all the fields");
      return;
    }
    vendorLogin(GSTIN, password);
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
        Vendor Login
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col justify-center items-center"
      >
        <div className="space-y-2 w-full">
          <label
            htmlFor="GSTIN"
            className="block mb-2 text-lg font-medium text-gray-900 "
          >
            GSTIN
          </label>
          <input
            className="bg-gray-50 border border-green-400 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            id="GSTIN"
            type="text"
            placeholder="Enter your GSTIN"
            value={GSTIN}
            onChange={(e) => setGSTIN(e.target.value)}
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
            className="bg-gray-50 border border-green-400 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
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

export default VendorLogin;
