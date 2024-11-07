import React, { useState } from "react";
import { useAdminSignup } from "../../../hooks/signup-hooks/useAdminSignUp.js";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext.jsx";

const AdminSignup = () => {
  const { adminSignup, error, loading } = useAdminSignup();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { auth } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      toast.warn("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    if (auth.userType !== "admin") {
      toast.error("You are not authorized to signup a new admin");
      return;
    }
    adminSignup(username, password, confirmPassword);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Signup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <InputField
          label="Username"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <InputField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <InputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />

        <SubmitButton loading={loading} text="Signup" />
      </form>
    </>
  );
};

const InputField = ({ label, id, type, value, onChange, placeholder }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

const SubmitButton = ({ loading, text }) => (
  <button
    type="submit"
    className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
    disabled={loading}
  >
    {text}
  </button>
);

export default AdminSignup;
