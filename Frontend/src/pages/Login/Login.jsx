import React from "react";
import { useState } from "react";
import AdminLogin from "../../components/Login-components/Adminlogin.jsx";
import VendorLogin from "../../components/Login-components/VendorLogin.jsx";
import CustomerLogin from "../../components/Login-components/CustomerLogin.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  const [selected, setSelected] = useState("Customer");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <>
      <div className="flex flex-col items-center p-8 space-y-2">
        <div className="relative w-80">
          <div className="flex justify-around bg-sky-700 border-2 border-sky-800 rounded-full shadow-lg">
            {["Admin", "Vendor", "Customer"].map((option) => (
              <div
                key={option}
                className={`py-3 px-4 flex-1 text-center cursor-pointer transition-all duration-300 ${
                  selected === option ? "text-black font-bold z-10" : "text-slate-100"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-blue-200 rounded-full transition-all duration-300"
            style={{
              transform: `translateX(${["Admin", "Vendor", "Customer"].indexOf(selected) * 100}%)`,
            }}
          />
        </div>

        <div className="w-full max-w-sm p-6 bg-slate-700 rounded-3xl shadow-md border border-gray-200 h-96">
          {selected === "Admin" && <AdminLogin />}
          {selected === "Vendor" && <VendorLogin />}
          {selected === "Customer" && <CustomerLogin />}
        </div>
        <div>
          <p>
            Don't have an account? <span className="text-blue-600 underline cursor-pointer" onClick={()=>navigate("/signup")}>Signup</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
