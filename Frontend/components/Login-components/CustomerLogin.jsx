import React from "react";

const CustomerLogin = () => {
  return (
    <div>
      <h1>Customer Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
