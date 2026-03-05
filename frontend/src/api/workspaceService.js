import axiosInstance from "./axios";

export const fetchWorkspaces = async () => {
    const response = await axiosInstance.get("/workspaces/");

    const data = response.data;

    return Array.isArray(data) ? data : data.results;
};

export const createWorkspace = async (data) => {
    const response = await axiosInstance.post("/workspaces/", data);
    return response.data;
};

export const updateWorkspace = async (id, data) => {
    const response = await axiosInstance.patch(`/workspaces/${id}/`, data);
    return response.data;
};

export const deleteWorkspace = async (id) => {
    await axiosInstance.delete(`/workspaces/${id}/`);
};