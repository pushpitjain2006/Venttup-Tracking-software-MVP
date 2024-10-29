import { useState, useEffect } from "react";
import useAxios from "../src/utils/useAxios";

const useFetchUsers = (userType) => {
  console.log("Inside useFetchUsers");
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/admin/view-users?type=${userType}`);
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
