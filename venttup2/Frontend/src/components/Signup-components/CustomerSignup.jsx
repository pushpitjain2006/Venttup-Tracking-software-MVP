import React, { useState } from "react";
import { useCustomerSignup } from "../../../hooks/signup-hooks/useCustomerSignup.js";
import { toast } from "react-toastify";
import { InputField, SubmitButton } from "./inputFields.jsx";

const CustomerSignup = () => {
  const { customerSignup, error, loading } = useCustomerSignup();
  const [GSTIN, setGSTIN] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!GSTIN || !password || !confirmPassword || !contact || !address) {
      toast.warn("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match");
      return;
    }
    customerSignup(GSTIN, password, confirmPassword, address, contact);
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Customer Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <InputField
          label="Contact"
          id="contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
        />
        <InputField
          label="Address"
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter Address"
        />
        <InputField
          label="GSTIN"
          id="GSTIN"
          type="text"
          value={GSTIN}
          onChange={(e) => setGSTIN(e.target.value)}
          placeholder="Enter GSTIN"
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <InputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />

        <SubmitButton loading={loading} text="Signup" />
      </form>
    </>
  );
};

export default CustomerSignup;
