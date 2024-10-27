import React, { useState } from "react";
import { useVendorLogin } from "../../../hooks/useVendorLogin";
import { toast } from "react-toastify";

const VendorLogin = () => {
  const [password, setPassword] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const { vendorLogin, error, loading } = useVendorLogin();
  function handleSubmit(e) {
    console.log("Inside handleSubmit");
    e.preventDefault();
    if (!GSTIN || !password) {
      toast("Please fill all the fields");
      return;
    }
    vendorLogin(GSTIN, password);
  }
  return (
    <div>
      <h1>Vendor Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="GSTIN"
          value={GSTIN}
          onChange={(e) => {
            setGSTIN(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
      {loading ? <p>loading...</p> : ""}
    </div>
  );
};

export default VendorLogin;
