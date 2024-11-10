import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import useAxios from "../utils/useAxios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [shouldDisappear, setShouldDisappear] = useState(false); // New state for disappearance control
  const navigate = useNavigate();
  const axios = useAxios();
  const { auth } = useAuth();
  const userType = auth.userType;
  const notificationRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${userType}/get-notification`);
        setNotifications(response.data);
        setUnreadCount(response.data?.length);
        if (response.data?.length === 0) {
          setShouldDisappear(true);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [userType]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleIconClick = async () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      try {
        await axios.get(`${userType}/clear-notification`);
        setUnreadCount(0);
        setTimeout(() => {
          setShouldDisappear(true);
        }, 300);
      } catch (error) {
        console.error("Error clearing notifications:", error);
      }
    }
  };

  const handleNotificationClick = (orderId) => {
    setIsDropdownOpen(false);
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div
      ref={notificationRef}
      className={`fixed top-1/4 right-5 z-50 transition-all duration-500 ease-out ${
        shouldDisappear && !isDropdownOpen
          ? "translate-x-full opacity-15"
          : "translate-x-0 opacity-100"
      }`}
    >
      <div className="relative cursor-pointer" onClick={handleIconClick}>
        <IoNotificationsOutline
          size={32}
          className={`text-black ${
            unreadCount > 0 ? "animate-bounce" : ""
          } transition-transform duration-300`}
        />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            {unreadCount}
          </span>
        )}
      </div>

      <div
        className={`absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl transition-opacity duration-300 transform ${
          isDropdownOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ display: isDropdownOpen ? "block" : "none" }}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h4 className="text-gray-800 font-semibold">Notifications</h4>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsDropdownOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                onClick={() => handleNotificationClick(notification._id)}
                className="p-3 border-b cursor-pointer hover:bg-gray-100 text-gray-700 flex items-center"
              >
                <span className="mr-2">🌱</span>
                <span className="truncate">
                  New update for orderID - {notification._id}
                </span>
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">
              No new notifications
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationIcon;
