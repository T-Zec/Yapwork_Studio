import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { fetchChannels } from "../../api/channelService";
import { useNavigate, useParams } from "react-router-dom";
import CreateChannelModal from "../chat/CreateChannelModal";

const ChannelList = () => {
    const { activeWorkspace } = useWorkspace();
    const [channels, setChannels] = useState([]);
    const { channelId } = useParams();    
    
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);    

    const loadChannels = async () => {
        try {
            const data = await fetchChannels(activeWorkspace.id);
            setChannels(data);
        } catch (error) {
            console.error("Failed to load channels", error);
        }
    };

    useEffect(() => {
        if (!activeWorkspace) return;
        
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

                <button
                    onClick={() => setOpenModal(true)}
                    className="text-xs text-blue-400 mt-2"
                >
                    + Create Channel
                </button>
    
                <CreateChannelModal 
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    reload={loadChannels}
                />

                {channels.map((channel) => (
                    <div
                        key={channel.id}
                        onClick={() => openChannel(channel.id)}
                        className={`text-sm px-2 py-1 rounded cursor-pointer
                            ${
                                Number(channelId) === channel.id
                                    ? "bg-gray-700" : "hover:bg-gray-700"
                            }
                        `}
                    >
                        # {channel.name}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ChannelList;