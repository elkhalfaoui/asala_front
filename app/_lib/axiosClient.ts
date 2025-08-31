import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
});

axiosClient.interceptors.request.use(
  (config) => {
    // Only add Authorization header for NON-guest endpoints
    if (typeof window !== "undefined" && !config.url?.includes("/guest/")) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;