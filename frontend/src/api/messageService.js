import axiosInstance from "./axios";

export const fetchMessages = async (workspaceId, channelId, page = 1) => {
    const response = await axiosInstance.get(`/workspaces/${workspaceId}/channels/${channelId}/messages/?page=${page}`);
    return response.data;
};

export const sendMessage = async (workspaceId, channelId, data) => {
    const response = await axiosInstance.post(`/workspaces/${workspaceId}/channels/${channelId}/messages/`, data);
    // {
    //     headers: {
    //         "Content-Type": "multipart/form-data",
    //     },
    // }

    return response.data;
};

export const editMessage = async (workspaceId, channelId, messageId, data) => {
    const response = await axiosInstance.patch(`/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/`, data);
    return response.data;
};

export const deleteMessage = async (workspaceId, channelId, messageId) => { 
    await axiosInstance.delete(`/workspaces/${workspaceId}/channels/${channelId}/messages/${messageId}/`);
};