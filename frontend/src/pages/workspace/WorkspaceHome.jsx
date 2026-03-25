import { useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useChannels } from "../../context/ChannelContext";
import CreateChannelModal from "../../components/channel/CreateChannelModal";

const WorkspaceHome = () => {
    const { activeWorkspace } = useWorkspace();
    const { reloadChannels } = useChannels();
    
    const [openModal, setOpenModal] = useState(false);
    
    if (!activeWorkspace) return null;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">

            {/* Workspace Name */}
            <h1 className="text-2xl font-bold mb-4 border-blue-500 border-b-2">
                {activeWorkspace.name}
            </h1>

            {/* Empty Message */}
            <p className="text-gray-500 mb-6">
                No channel or feature tab selected. Start by creating one or pick from the sidebar.
            </p>

            {/* Create Button */}
            <button 
                onClick={() => setOpenModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold transition hover:scale-95">
                + Create Channel
            </button>

            {/* Create Modal */}
            <CreateChannelModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                reloadChannels={reloadChannels}
            />

        </div>
    );
};

export default WorkspaceHome;