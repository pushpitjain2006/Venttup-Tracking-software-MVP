import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import NotificationIcon from '../components/NotificationIcon';
import { useAuth } from "../../context/AuthContext.jsx";

const MainLayout = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div>
      {auth.token && !isAuthPage && <NotificationIcon />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
