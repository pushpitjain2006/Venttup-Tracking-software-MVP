import React from "react";
import { motion } from "framer-motion";

export function DashboardCard({ title, icon, onclick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center hover:scale-105 transition duration-500 bg-[#4caf50] p-8 rounded-lg shadow-lg hover:bg-[#66bb6a] cursor-pointer"
      onClick={onclick}
    >
      <div className="flex items-center">
        {icon} {/* Display the icon */}
        <p className="text-lg font-semibold text-white text-center">{title}</p>
      </div>
    </motion.div>
  );
}