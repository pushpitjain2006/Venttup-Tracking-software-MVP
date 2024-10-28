import React from "react";

export function DashboardCard({ title, onclick }) {
  return (
    <div 
      className="flex items-center justify-center bg-[#5c6378] p-8 rounded-lg shadow-lg hover:bg-[#8d8d9e] transition-colors cursor-pointer"
      onClick={onclick}
    >
      <p className="text-lg font-semibold text-white text-center">{title}</p>
    </div>
  );
}