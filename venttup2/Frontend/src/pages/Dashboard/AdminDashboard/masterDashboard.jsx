import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ShoppingCart, Users, UploadCloud, UserPlus } from "lucide-react"; // Import icons
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { DashboardCard } from "../../../components/AdminDashboard/DashboardCard";
import { useAuth } from "../../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";

function MasterDashboard() {
  const axios = useAxios();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  async function handelLogout() {
    setAuth(null);
    const res = await axios.get("/admin/logout");
    navigate("/");
  }

  return (
    <>
      <div className="h-screen w-full bg-[#e0f7f0] overflow-hidden">
        {/* Top Navbar */}
        <motion.div
          className="fixed h-24 w-full bg-[#00796b] flex items-center justify-between shadow-md"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="w-12 h-12 bg-[#80cbc4] flex items-center justify-center rounded-full mx-7">
            <Bell className="h-6 w-6 text-white cursor-pointer hover:text-gray-300" />
          </div>
          <div className="mx-7">
            <button
              className="text-white font-medium bg-[#d32f2f] px-3 py-2 rounded-lg hover:bg-[#c62828] transition duration-200"
              onClick={() => handelLogout()}
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="h-full flex flex-col items-center justify-center bg-[#e0f7f0] pt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-4xl mb-10 text-[#004d40]">
              Admin Dashboard
            </h1>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 w-full max-w-4xl p-4">
            <DashboardCard
              title="View Orders"
              icon={<ShoppingCart className="w-6 h-6 text-white mr-2" />}
              onclick={() => navigate("/admin/ViewOrders")}
            />
            <DashboardCard
              title="Edit Users"
              icon={<Users className="w-6 h-6 text-white mr-2" />}
              onclick={() => navigate("/view-users")}
            />
            <DashboardCard
              title="Upload Order"
              icon={<UploadCloud className="w-6 h-6 text-white mr-2" />}
              onclick={() => navigate("/upload-order")}
            />
            <DashboardCard
              title="Add More Users"
              icon={<UserPlus className="w-6 h-6 text-white mr-2" />}
              onclick={() => navigate("/Admin-signup")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterDashboard;