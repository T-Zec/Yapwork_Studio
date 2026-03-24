import { useEffect, useRef, useState } from "react";
import { updateWorkspace, deleteWorkspace } from "../../api/workspaceService";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import RenameModal from "../common/RenameModal";

const WorkspaceMenu = ({ workspace }) => {
    const { activeWorkspace, setWorkspaces, switchWorkspace, reloadWorkspaces } = useWorkspace();
    const { user } = useAuth();

    const menuRef = useRef();

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(activeWorkspace?.name || "");

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isOwner = activeWorkspace?.created_by === user?.id;

    if (!activeWorkspace) return null;

    const handleRename = async () => {
        if (!name.trim()) return;

        try {
            setIsEditing(true);

            const updated = await updateWorkspace(workspace.id, { name });
            setWorkspaces((prev) =>
                prev.map((ws) => ws.id === workspace.id ? updated : ws)
            );
            switchWorkspace(updated);
            
            if (activeWorkspace?.id === workspace.id) {
                switchWorkspace(updated);
            }

            setEditing(false);
            setIsEditing(false);
            setOpen(false);        

        } catch (error) {
            console.error("Failed to rename workspace", error);
        }

        await reloadWorkspaces();
    };

    const confirmDelete = async () => {
        try {
            setDeleting(true);

            await deleteWorkspace(workspace.id);

            setWorkspaces((prev) =>
                prev.filter((ws) => ws.id !== workspace.id)
            );

        } catch (error) {
            console.error("Failed to delete workspace", error);

        } finally {
            setDeleting(false);
            setDeleteOpen(false);
            setOpen(false);
        }
        
        await reloadWorkspaces();
    };

    // useEffect(() => {        
    //     const handleClickOutside = (event) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setOpen(false);
    //         }
    //     };

    //         document.addEventListener("mousedown", handleClickOutside);

    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    // }, []);

    useEffect(() => {
        if (open) {
            setName(activeWorkspace?.name || "");
        }
    }, [open, activeWorkspace]);

    return (
        <div ref={menuRef} className="relative">

            {isOwner ? (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(!open);
                    }}
                    onKeyDown={(event) => {
                            if (event.key === "Escape") setOpen(false);
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
                    className="absolute left-0 mt-1 bg-gray-800 border text-sm rounded shadows-lg w-36">

                    <button
                        onClick={() => {
                            setEditing(true);
                            setOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                    >
                        Rename
                    </button>

                    <button
                        onClick={() => {
                            setDeleteOpen(true);
                            setOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-red-400 hover:bg-gray-700"
                    >
                        Delete
                    </button>

                </div>
            )}

            {/* Delete Modal */}
            <DeleteConfirmationModal
                open={deleteOpen}
                title="Delete Workspace"
                message={`Are you sure you want to delete "${activeWorkspace.name}"? This will remove all the channels and messages.`}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setDeleteOpen(false);
                    setOpen(false);
                }}
                loading={deleting}
            />

            {/* Rename Modal */}
            <RenameModal
                open={editing}
                title="Rename Workspace"
                initialValue={name}
                setValue={(value) => setName(value)}
                onSave={handleRename}
                onCancel={() => {
                    setEditing(false);
                    setOpen(false);
                }}
                loading={isEditing}
            />

            {/* {editing && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div 
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                event.preventDefault();
                                setEditing(false);
                            }
                            if (event.key === "Enter") {
                                event.preventDefault();
                                handleRename();
                            }
                        }}
                        className="text-gray-700 bg-white p-6 rounded-lg w-96 animate-[scaleIn_.15s_ease]">

                        <h2 className="font-semibold mb-3">Rename Workspace</h2>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border px-3 py-2 w-full rounded"
                            autoFocus
                        />

                        <div className="flex justify-end gap-2 mt-4">

                            <button
                                onClick={() => setEditing(false)}
                                className="text-gray-500"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleRename}
                                disabled={!name.trim()}
                                className={`text-white px-4 py-1 rounded 
                                    ${name.trim() ? 
                                        "bg-blue-500 hover:bg-blue-600" : 
                                        "bg-gray-400 cursor-not-allowed"}`}
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>
            )} */}

        </div>
    );
};

export default WorkspaceMenu;