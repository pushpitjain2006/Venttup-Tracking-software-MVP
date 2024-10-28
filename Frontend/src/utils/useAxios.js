import { useMemo } from "react";
import axios from "axios";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    const backendURL = import.meta.env.VITE_BackendURL || "http://localhost:3001";
    const instance = axios.create({
      baseURL: backendURL, 
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const authItem = localStorage.getItem("auth");
        const token = JSON.parse(authItem)?.token;
        if (token) {
          config.headers.authorization = `${JSON.parse(authItem)?.userType} ${token}`;
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
