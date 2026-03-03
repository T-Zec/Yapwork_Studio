import axios from "axios";

// Base URL
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default axiosInstance;