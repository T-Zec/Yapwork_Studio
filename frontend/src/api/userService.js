import axiosInstance from "./axios";

export const updateProfile = (data) => {
    axiosInstance.patch("/users/me/", data);
};

export const changePassword = (data) => {
    axiosInstance.post("/users/changePassword/", data);
};

export const uploadAvatar = (data) => {
    axiosInstance.post("/users/avatar/", data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteAccount = () => axiosInstance.delete("/users/me/");