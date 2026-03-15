import { useState } from "react";
import { updateWorkspace, deleteWorkspace } from "../../api/workspaceService";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";

const WorkspaceMenu = ({ workspace }) => {
    const { activeWorkspace, setWorkspaces, setActiveWorkspace } = useWorkspace();
    const [open, setOpen] = useState(false);

    const { user } = useAuth();
    const isOwner = activeWorkspace?.created_by === user?.id;

    const handleRename = async () => {
        const name = prompt("New workspace name", workspace.name);
        if (!name) return;

        try {
            const updated = await updateWorkspace(workspace.id, { name });
            setWorkspaces((prev) =>
                prev.map((ws) => ws.id === workspace.id ? updated : ws)
            );
            
            if (activeWorkspace?.id === workspace.id) {
                setActiveWorkspace(updated);
            }
        } catch (error) {
            console.error("Rename failed", error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm("Delete this workspace?");
        if (!confirmDelete) return;

        try {
            await deleteWorkspace(workspace.id);
            setWorkspaces((prev) =>
                prev.filter((ws) => ws.id !== workspace.id)
            );

            setActiveWorkspace(null);
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="relative">

            {isOwner ? (
                <button
                    onClick={() => setOpen(!open)}
                    onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                setOpen(false);
                            }
                        }}
                    className="text-sm font-semibold"
                >
                    {workspace.name} {open ? '▲' : '▼'}
                </button>
            ) : (

                <button                    
                    className="text-sm font-semibold"
                >
                    {workspace.name}
                </button>
            )}

            {open && isOwner && (
                <div
                    className="absolute mt-2 bg-gray-800 border text-sm rounded shadows-lg w-36">

                    <button
                        onClick={handleRename}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                    >
                        Rename
                    </button>

                    <button
                        onClick={handleDelete}
                        className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700"
                    >
                        Delete
                    </button>

                </div>
            )}
        </div>
    );
};

export default WorkspaceMenu;