import axiosInstance from "./axios";

export const loginRequest = async (credentials) => {
    const response = await axiosInstance.post("/token/", credentials);
    return response.data;
};

export const registerRequest = async (data) => {
    const response = await axiosInstance.post("/users/register/", data);
    return response.data;
};

export const refreshRequest = async (refreshToken) => {
    const response = await axiosInstance.post("/token/refresh/", {refresh: refreshToken});
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get("/users/me/");
    return response.data;
}