import { useEffect, useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import { useAuth } from "../../context/AuthContext";

const WorkspaceSidebar = () => {
    const { workspaces, activeWorkspace, switchWorkspace } = useWorkspace();
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const isOwner = activeWorkspace?.created_by === user?.id;

    useEffect(() => {
        const isOwner = activeWorkspace?.created_by === user?.id;
    }, [activeWorkspace]);

    return (
        <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-3 overflow-auto max-h-screen scrollbar-hide scrollbar-hidden">

            {workspaces.map((ws) => (
                <button
                    key={ws.id}
                    title={ws.description}
                    onClick={() => switchWorkspace(ws)}
                    className={`w-10 h-10 rounded flex items-center justify-center hover:bg-blue-500 flex-shrink-0
                        ${activeWorkspace?.id === ws.id ? "bg-blue-500" : "bg-gray-700"}
                    `}
                >
                    {ws.name.charAt(0).toUpperCase()}
                </button>
            ))}

            {isOwner &&
                <button
                    onClick={() => setOpenModal(true)}
                    className="w-10 h-10 rounded text-lg bg-blue-500 hover:scale-110 flex-shrink-0"
                >
                    +
                </button>
            }

            <CreateWorkspaceModal
                open={openModal}
                onClose={() => setOpenModal(false)}
            />

        </div>
    );
};

export default WorkspaceSidebar;