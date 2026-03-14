import { createContext, useContext, useEffect, useState } from "react";
import { fetchChannels } from "../api/channelService"
import { useWorkspace } from "./WorkspaceContext";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
    const { activeWorkspace } = useWorkspace();

    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadChannels = async () => {
        if (!activeWorkspace) return;
        
        try {
            const data = await fetchChannels(activeWorkspace.id);
            setChannels(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!activeWorkspace) {
            setChannels([]);
            return;
        }
        
        loadChannels();
    }, [activeWorkspace]);

    return (
        <ChannelContext.Provider 
            value={{ 
                channels, 
                loading,
                reloadChannels: loadChannels
            }}>
            {children}
        </ChannelContext.Provider>
    );
};

export const useChannels = () => useContext(ChannelContext);