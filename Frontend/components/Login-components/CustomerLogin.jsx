import React from "react";
import { useState } from "react";
import { useCustomerLogin } from "../../hooks/useCustomerLogin";
import { toast } from "react-toastify";

const CustomerLogin = () => {
  const [GSTIN, setGSTIN] = useState("");
  const [password, setPassword] = useState("");
  const { customerLogin, error, loading } = useCustomerLogin();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Inside handleSubmit");
    if (!GSTIN || !password) {
      toast("Please fill all the fields");
      return;
    }
    customerLogin(GSTIN, password);
    
  }

  return (
    <div>
      <h1>Customer Login</h1>
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
      {loading && <p>Logging in...</p>}
    </div>
  );
};

export default CustomerLogin;
