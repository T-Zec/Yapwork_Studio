import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useChannels } from "../../context/ChannelContext";
import { useNavigate, useParams } from "react-router-dom";
import CreateChannelModal from "../channel/CreateChannelModal";
import ChannelMenu from "../channel/ChannelMenu";

const ChannelList = () => {
    const { activeWorkspace } = useWorkspace();
    const { channels, reloadChannels } = useChannels();
    const { channelId } = useParams();    
    const [openModal, setOpenModal] = useState(false);
    
    const navigate = useNavigate();

    const openChannel = (channelId) => {
        navigate(`/workspaces/${activeWorkspace.id}/channels/${channelId}/`);
    };

    useEffect(() => {
        if (!activeWorkspace) return;
        
        reloadChannels();
    }, [activeWorkspace]);

    if (!activeWorkspace) return null;

    return (
        <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2">Channels</h3>

            <div className="space-y-1">

                <button
                    onClick={() => setOpenModal(true)}
                    className="text-xs text-blue-400 hover:text-blue-300 mt-2"
                >
                    + Create Channel
                </button>
    
                <div>
                    <CreateChannelModal 
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        reloadChannels={reloadChannels}
                    />
                </div>

                {channels.map((channel) => (

                    <div
                        key={channel.id}
                        onClick={() => openChannel(channel.id)}
                        className={`group flex items-center justify-between px-2 py-1 rounded cursor-pointer text-sm
                                ${
                                    Number(channelId) === channel.id
                                        ? "bg-gray-700" : "hover:bg-gray-700"
                                }
                            `}
                    >
                        <span>
                            # {channel.name}
                        </span>

                        <div className="opacity-0 group-hover:opacity-100"
                        >
                            <ChannelMenu 
                                channel={channel} 
                                reloadChannels={reloadChannels}
                            />
                        </div>

                    </div>
                    
                ))}

            </div>
        </div>
    );
};

export default ChannelList;