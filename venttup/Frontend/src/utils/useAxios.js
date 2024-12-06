import { useMemo } from "react";
import axios from "axios";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    const backendURL =
      import.meta.env.VITE_APP_BackendURL || "http://localhost:3001";
    const instance = axios.create({
      baseURL: backendURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const authItem = localStorage.getItem("auth");
        const authData = authItem ? JSON.parse(authItem) : null;
        const token = authData?.token;
        if (token) {
          config.headers.authorization = `${authData?.userType} ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosInstance;
};

export default useAxios;
