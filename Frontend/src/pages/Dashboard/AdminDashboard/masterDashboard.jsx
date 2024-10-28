import React from "react";
import { useNavigate } from "react-router-dom"
import { Bell } from "lucide-react"; 
import { DashboardCard } from "../../../components/AdminDashboard/DashboardCard";

function MasterDashboard() {
  const navigate = useNavigate();
  return (
  <>
    <div className="absolute w-12 h-12 bg-blue-400 flex items-center justify-center rounded-full m-2 left-[1450px]">
      <Bell className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 " />
    </div>

    <div className="h-lvh flex flex-col items-center justify-center bg-[#2d2d42]">
      <div>
        <h1 className="font-bold text-4xl mb-10 text-white">Admin Dashboard</h1>
      </div>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl p-4">
        <DashboardCard title="Assign Vendors" />
        <DashboardCard title="View Orders" />
        <DashboardCard title="Edit Customers & Vendors" onclick={()=>navigate("/view-users")}/>
        <DashboardCard title="Add More Admins" />
      </div>
    </div>
  </>
  );
}


export default MasterDashboard;
