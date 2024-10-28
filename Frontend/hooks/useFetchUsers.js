import { useState, useEffect } from "react";
import axios from "axios";

const useFetchUsers = (userType) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("auth");
        const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
        const authObj=JSON.parse(token);
        const response = await axios.get(`${backendURL}/admin/view-users?type=${userType}`,{
          headers: {
            authorization: `${authObj.userType} ${authObj.token}`,
          },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    if (userType) fetchUsers();
  }, [userType]);

  return { users, setUsers, loading, error };
};

export default useFetchUsers;
