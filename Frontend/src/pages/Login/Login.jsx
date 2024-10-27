import React from "react";
import "./Menu.css";
import { useState } from "react";
import Adminlogin from "../../components/Login-components/Adminlogin.jsx";
import VendorLogin from "../../components/Login-components/VendorLogin.jsx";
import CustomerLogin from "../../components/Login-components/CustomerLogin.jsx";
const Login = () => {
  const [selected, setSelected] = useState("Customer");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu">
          {["Admin", "Vendor", "Customer"].map((option) => (
            <div
              key={option}
              className={`menu-item ${selected === option ? "selected" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div
          className="slider"
          style={{
            left: `${
              ["Admin", "Vendor", "Customer"].indexOf(selected) * 33.33
            }%`,
          }}
        />
      </div>

      <div className="login-form">
        {selected === "Admin" && <Adminlogin />}
        {selected === "Vendor" && <VendorLogin />}
        {selected === "Customer" && <CustomerLogin />}
      </div>
    </>
  );
};

export default Login;
