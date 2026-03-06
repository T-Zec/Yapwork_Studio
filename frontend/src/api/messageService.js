import axiosInstance from "./axios";

export const fetchMessages = async (workspaceId, channelId) => {
    const response = await axiosInstance.get(`/workspaces/${workspaceId}/channels/${channelId}/messages/`);
    return response.data.results || response.data;
};

export const createMessage = async (workspaceId, channelId, data) => {
    const response = await axiosInstance.post(`/workspaces/${workspaceId}/channels/${channelId}/messages/`, data);
    return response.data;
};

export const updateMessage = async (workspaceId, channelId, messageId, data) => {
    const response = await axiosInstance.patch(`/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/`, data);
    return response.data;
};

export const deleteMessage = async (workspaceId, channelId, messageId) => {
    await axiosInstance.delete(`/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/`);
};