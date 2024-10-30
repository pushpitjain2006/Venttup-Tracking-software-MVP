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
    <div className="h-lvh w-lvw flex items-center justify-center bg-gradient-to-r from-stone-600 to-slate-700">
      <div className="flex flex-col items-center p-8">
        <div className="relative w-96">
          <div className="flex justify-around bg-white backdrop-blur-sm border-2 z-0 border-sky-800 rounded-full shadow-lg">
            {["Admin", "Vendor", "Customer"].map((option) => (
              <div
                key={option}
                className={`py-3 px-4 flex-1 text-center cursor-pointer transition-all duration-300 ${
                  selected === option ? "text-black font-bold z-20 bg-slate-300 rounded-full" : "text-slate-900"
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md p-6 bg-white/30 mt-6 mb-2 rounded-3xl drop-shadow-2xl h-96">
          {selected === "Admin" && <AdminLogin />}
          {selected === "Vendor" && <VendorLogin />}
          {selected === "Customer" && <CustomerLogin />}
        </div>
        <div>
          <p className="text-white">
            Don't have an account? <span className="hover:text-blue-600 hover:underline cursor-pointer" onClick={()=>navigate("/signup")}>Signup</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
