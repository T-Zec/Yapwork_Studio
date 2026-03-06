import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { fetchChannels } from "../../api/channelService";
import { useNavigate } from "react-router-dom";

const ChannelList = () => {
    const { activeWorkspace } = useWorkspace();
    const [channels, setChannels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!activeWorkspace) return;

        const loadChannels = async () => {
            try {
                const data = await fetchChannels(activeWorkspace.id);
                setChannels(data);
            } catch (error) {
                console.error("Failed to load channels", error);
            }
        };
        loadChannels();
    }, [activeWorkspace]);

    if (!activeWorkspace) return null;

    const openChannel = (channelId) => {
        navigate(`/workspaces/${activeWorkspace.id}/channels/${channelId}/`);
    };

    return (
        <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2">Channels</h3>

            <div className="space-y-1">
                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        onClick={() => openChannel(channel.id)}
                        className="text-sm px-2 py-1 rounded hover:bg-gray-700 cursor-pointer"
                    >
                        # {channel.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelList;