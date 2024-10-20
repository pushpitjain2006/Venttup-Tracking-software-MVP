import React, { useState } from "react";
import { useAdminLogin } from "../../hooks/useAdminLogin.js";
import { toast } from "react-toastify";

const Adminlogin = () => {
  const { adminLogin, error, loading } = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    e.preventDefault();
    if (!username || !password) {
      toast("Please fill all the fields");
      return;
    }
    adminLogin(username, password);
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
        {loading && <p>Logging in...</p>}
      </form>
    </div>
  );
};

export default Adminlogin;
