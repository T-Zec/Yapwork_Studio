import { createContext, useContext, useEffect, useState } from "react";
import { fetchChannels } from "../api/channelService"
import { useWorkspace } from "./WorkspaceContext";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
    const { activeWorkspace } = useWorkspace();

    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!activeWorkspace) return;

        const loadChannels = async () => {
            try {
                const data = await fetchChannels(activeWorkspace.id);
                setChannels(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadChannels();
    }, [activeWorkspace]);

    return (
        <ChannelContext.Provider value={{ channels, loading }}>
            {children}
        </ChannelContext.Provider>
    );
};

export const useChannels = () => useContext(ChannelContext);