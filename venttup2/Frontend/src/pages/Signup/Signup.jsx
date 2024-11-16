import React, { useState } from "react";
import AdminSignup from "../../components/Signup-components/AdminSignup.jsx";
import VendorSignup from "../../components/Signup-components/VendorSignup.jsx";
import CustomerSignup from "../../components/Signup-components/CustomerSignup.jsx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLeaf, FaUserShield, FaUsers } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext.jsx";
import bgVideo from "../../assets/venttup2 (1).mp4";

const Signup = () => {
  const { auth } = useAuth();
  const adminLoggedIn = auth?.userType === "admin";
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Admin");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-green-600 to-blue-700 relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20"></div>
      {adminLoggedIn && (
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 flex items-center space-x-2 bg-white text-blue-600 py-2 px-4 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
      )}
      <div className="flex flex-col items-center p-4 sm:p-8 w-full max-w-lg relative z-10 space-y-6">
        <div className="flex justify-around w-full bg-white bg-opacity-70 border-2 border-blue-600 rounded-full shadow-lg mb-4 transition duration-500 ease-in-out hover:shadow-2xl">
          {[
            { name: "Admin", icon: <FaUserShield /> },
            { name: "Vendor", icon: <FaLeaf /> },
            { name: "Customer", icon: <FaUsers /> },
          ].map(({ name, icon }) => (
            <div
              key={name}
              className={`py-2 sm:py-3 px-4 flex-1 text-center cursor-pointer ${
                selected === name
                  ? "bg-blue-500 text-white font-bold rounded-full shadow-md"
                  : "text-slate-900"
              } transition-all duration-300`}
              onClick={() => handleSelect(name)}
            >
              <div className="flex justify-center items-center space-x-1">
                {icon}
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-lg p-5 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl max-h-[85vh] overflow-y-auto transition duration-500 hover:scale-105 hover:shadow-2xl">
          {selected === "Admin" && <AdminSignup />}
          {selected === "Vendor" && <VendorSignup />}
          {selected === "Customer" && <CustomerSignup />}
        </div>

        {!adminLoggedIn && (
          <div className="mt-4">
            <p className="text-white text-sm sm:text-base">
              Already have an account?{" "}
              <button
                className="text-green-200 hover:text-blue-400 cursor-pointer underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>

      <div className="absolute -bottom-12 -left-16 w-36 h-36 bg-blue-300 rounded-full filter blur-lg animate-pulse opacity-60"></div>
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-green-400 rounded-full filter blur-lg animate-bounce opacity-70"></div>
    </div>
  );
};

export default Signup;
