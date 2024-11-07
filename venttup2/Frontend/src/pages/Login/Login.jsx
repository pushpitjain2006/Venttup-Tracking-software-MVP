import React, { useState } from "react";
import AdminLogin from "../../components/Login-components/Adminlogin.jsx";
import VendorLogin from "../../components/Login-components/VendorLogin.jsx";
import CustomerLogin from "../../components/Login-components/CustomerLogin.jsx";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaUserShield, FaUsers } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Admin");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"></div>

      <div className="flex flex-col items-center p-4 sm:p-8 w-full max-w-md relative z-10">
        <div className="flex justify-around w-full bg-white bg-opacity-70 border-2 border-green-600 rounded-full shadow-lg mb-4 transition duration-500 ease-in-out hover:shadow-2xl">
          {[
            { name: "Admin", icon: <FaUserShield /> },
            { name: "Vendor", icon: <FaLeaf /> },
            { name: "Customer", icon: <FaUsers /> },
          ].map(({ name, icon }) => (
            <div
              key={name}
              className={`py-2 sm:py-3 px-4 flex-1 text-center cursor-pointer transition-all duration-300 ${
                selected === name
                  ? "bg-green-500 text-white font-bold rounded-full shadow-md"
                  : "text-slate-900"
              }`}
              onClick={() => handleSelect(name)}
            >
              <div className="flex justify-center items-center space-x-1">
                {icon}
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-md p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl transition duration-500 hover:scale-105 hover:shadow-2xl">
          {selected === "Admin" && <AdminLogin />}
          {selected === "Vendor" && <VendorLogin />}
          {selected === "Customer" && <CustomerLogin />}
        </div>

        <div className="mt-6">
          <p className="text-white text-sm sm:text-base">
            Don't have an account?{" "}
            <button
              className="text-green-200 hover:text-blue-400 cursor-pointer underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </p>
        </div>
      </div>

      <div className="absolute -bottom-12 -left-16 w-36 h-36 bg-green-300 rounded-full filter blur-lg animate-pulse opacity-60"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-400 rounded-full filter blur-lg animate-bounce opacity-70"></div>
    </div>
  );
};

export default Login;
