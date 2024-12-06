import React, { useState } from "react";
import { useVendorSignup } from "../../../hooks/signup-hooks/useVendorSignup.js";
import { toast } from "react-toastify";
import { InputField, SubmitButton } from "./inputFields.jsx";

const VendorSignup = () => {
  const { vendorSignup, error, loading } = useVendorSignup();
  const [GSTIN, setGSTIN] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const gstinPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z][0-9A-Z]$/;
  const [isValidGSTIN, setIsValidGSTIN] = useState(true);
  const [PasswordMatch, setPasswordMatch] = useState(true);

  const handleGSTChange = (e) => {
    const input = e.target.value;
    setGSTIN(input);
    setIsValidGSTIN(gstinPattern.test(input));
  };
  function handleSubmit(e) {
    try {
      e.preventDefault();
      if (!GSTIN || !password || !confirmPassword || !contact || !address) {
        toast.warn("Please fill all the fields");
        return;
      }
      if (!isValidGSTIN) {
        toast.warn("Invalid GSTIN format");
        return;
      }
      if (password !== confirmPassword) {
        toast.warn("Passwords do not match");
        return;
      }
      vendorSignup(GSTIN, password, confirmPassword, address, contact);
      if (error) {
        toast.error(error);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while signing up");
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Vendor Signup
      </h2>
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
          onChange={handleGSTChange}
          placeholder="Enter GSTIN"
          required
        />
        {!isValidGSTIN && (
          <p className="text-red-300 text-sm">Invalid GSTIN format.</p>
        )}
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
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordMatch(password === e.target.value);
          }}
          placeholder="Confirm Password"
        />
        {!PasswordMatch && (
          <p className="text-red-300 text-sm">Passwords do not match</p>
        )}

        <SubmitButton loading={loading} text="Signup" />
      </form>
    </>
  );
};

export default VendorSignup;
