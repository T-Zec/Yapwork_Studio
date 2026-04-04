import { useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WorkspaceSidebar = () => {
    const { workspaces, activeWorkspace, switchWorkspace } = useWorkspace();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="w-16 bg-gray-900 text-white 
            flex flex-col items-center py-4 space-y-3 select-none max-h-screen
        ">

            {/* Workspaces */}
            <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-3 scrollbar-hidden">
            {workspaces.map((ws) => (
                <div className="flex flex-col items-center">
                    <button
                        key={ws.id}
                        title={ws.description}
                        onClick={() => switchWorkspace(ws)}
                        className={`w-10 h-10 rounded flex items-center justify-center hover:bg-blue-500 flex-shrink-0 transition
                            ${activeWorkspace?.id === ws.id ? "bg-blue-500" : "bg-gray-700"}
                        `}
                    >
                        {ws.name.charAt(0).toUpperCase()}
                    </button>
                </div>
            ))}
            </div>
                
            <div className="flex flex-col items-center justify-center">

                <button
                    onClick={() => setOpenModal(true)}
                    className="w-10 h-10 rounded text-lg bg-blue-500 hover:scale-110 flex-shrink-0 transition"
                >
                    +
                </button>
            
                {/* Workspace Create Modal */}
                <CreateWorkspaceModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                />

                {/* Profile */}
                <div className="mt-auto p-4">
                    <button
                        onClick={() => navigate("/profile")}
                        className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-blue-500"
                    >
                        {user?.username?.charAt(0).toUpperCase()}
                    </button>
                </div>

            </div>

        </div>
    );
};

export default WorkspaceSidebar;