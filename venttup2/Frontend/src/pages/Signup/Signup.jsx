import React, { useState } from "react";
import AdminSignup from "../../components/Signup-components/AdminSignup.jsx";
import VendorSignup from "../../components/Signup-components/VendorSignup.jsx";
import CustomerSignup from "../../components/Signup-components/CustomerSignup.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate=useNavigate();
  const [selected, setSelected] = useState("Customer");

  const handleSelect = (option) => {
    setSelected(option);
  };

  return (
    <div className="h-lvh w-lvw flex items-center justify-center bg-gradient-to-r from-stone-600 to-slate-700 overflow-hidden">
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

        <div className="w-full max-w-sm p-6 mt-4 mb-2 bg-white/30 rounded-3xl drop-shadow-2xl min-h-[400px]">
          {selected === "Admin" && <AdminSignup />}
          {selected === "Vendor" && <VendorSignup />}
          {selected === "Customer" && <CustomerSignup />}
        </div>
        <div>
          <p className="text-white">
            Already have an account? <span className="hover:text-blue-600 hover:underline cursor-pointer" onClick={()=>navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
