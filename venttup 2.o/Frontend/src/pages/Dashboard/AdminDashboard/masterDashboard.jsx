import React from "react";
import { useNavigate } from "react-router-dom"
import { Bell } from "lucide-react"; 
import { DashboardCard } from "../../../components/AdminDashboard/DashboardCard";
import { useAuth } from "../../../../context/AuthContext";

function MasterDashboard() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  async function handelLogout() {
    setAuth(null);
    navigate("/");
  }
  return (
  <>
    <div className="h-lvh w-lvw bg-[#242440] overflow-hidden" >
      <div className="fixed h-24 w-full bg-[#242430] flex items-center justify-between">
        <div className=" w-12 h-12 bg-blue-400 flex items-center justify-center rounded-full mx-7">
          <Bell className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 " />
        </div>
        <div className="mx-7">
          <button
            className="text-white font-medium hover:underline"
            onClick={() => {
              handelLogout();
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="h-full flex flex-col items-center justify-center bg-[#242440]">
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
    </div>
    
    

    
  </>
  );
}


export default MasterDashboard;
