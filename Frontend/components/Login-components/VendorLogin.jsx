import React from "react";

const VendorLogin = () => {
  return (
    <div>
      <h1>Vendor Login</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default VendorLogin;
