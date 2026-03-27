const STORAGE_KEY = "yapwork_studio";

const getStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.log("Storage parse error", error);
        return {};
    }
};

const setStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.log("Storage write error", error);
    }
};

// Generic setter
export const setItem = (key, value) => {
    const storage = getStorage();
    storage[key] = value;
    setStorage(storage);
};

// Generic getter
export const getItem = (key) => {
    const storage = getStorage();
    return storage[key];
};

// Remove item
export const removeItem = (key) => {
    const storage = getStorage();
    delete storage[key];
    setStorage(storage);
};

// Clear all
export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};

// Last channel for workspace setter
export const setLastChannelForWorkspace = (workspaceId, channelId) => {
    const storage = getStorage();

    const lastChannels = storage.lastChannels || {};

    lastChannels[workspaceId] = channelId;
    storage.lastChannels = lastChannels;

    setStorage(storage);
};

// Last channel for workspace getter
export const getLastChannelForWorkspace = (workspaceId) => {
    const storage = getStorage();

    return storage.lastChannels?.[workspaceId];
};