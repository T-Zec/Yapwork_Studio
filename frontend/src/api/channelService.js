import axiosInstance from "./axios";

export const fetchChannels = async (workspaceId) => {
    const response = await axiosInstance.get(`/workspaces/${workspaceId}/channels/`);
    return response.data.results || response.data;
};

export const createChannel = async (workspaceId, data) => {
    const response = await axiosInstance.post(`/workspaces/${workspaceId}/channels/`, data);
    return response.data;
};

export const updateChannel = async (workspaceId, channelId, data) => {
    const response = await axiosInstance.patch(`/workspaces/${workspaceId}/channels/${channelId}/`, data);
    return response.data;
};

export const deleteChannel = async (workspaceId, channelId) => {
    await axiosInstance.delete(`/workspaces/${workspaceId}/channels/${channelId}/`);
}