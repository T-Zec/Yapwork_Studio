import { createContext, useContext, useEffect, useEffectEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChannels } from "../api/channelService"
import { useWorkspace } from "./WorkspaceContext";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
    const { activeWorkspace } = useWorkspace();
    
    const navigate = useNavigate();
    const { channelId } = useParams();

    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadChannels = async () => {
        if (!activeWorkspace) return;
        
        try {
            setLoading(true);

            const data = await fetchChannels(activeWorkspace.id);
            setChannels(data);

            if (data.length > 0 && !channelId) {
                navigate(`/workspaces/${activeWorkspace.id}/channels/${data[0].id}/`);
            }

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

    useEffect(() => {
        if (!channelId || channels.length === 0) return;

        const exists = channels.some((c) => c.id === Number(channelId));

        if (!exists) navigate(`/workspaces/${activeWorkspace.id}/channels/${data[0].id}/`);
    }, [channels, channelId]);

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