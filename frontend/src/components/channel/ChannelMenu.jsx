import { useState, useRef, useEffect } from "react";
import { updateChannel, deleteChannel } from "../../api/channelService";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";
import RenameModal from "../common/RenameModal";


const ChannelMenu = ({ channel, reloadChannels }) => {
    const { activeWorkspace } = useWorkspace();
    const { user } = useAuth();

    const menuRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [isRenaming, setisRenaming] = useState(false);
    const [name, setName] = useState(channel.name);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isOwner = activeWorkspace?.created_by === user?.id;    

    const handleRename = async () => {
        if (!name.trim()) return;

        try {
            setisRenaming(true);
            await updateChannel(activeWorkspace.id, channel.id, { name });

        } catch (error) {
            console.error("Failed to rename channel", error);

        } finally {
            setEditing(false);
            setisRenaming(false);
            setOpen(false);
        }
        
        await reloadChannels();
    };

    const confirmDelete = async () => {
        try {
            setDeleting(true);

            await deleteChannel(activeWorkspace.id, channel.id);
            
        } catch (error) {
            console.error("Failed to delete channel", error);

        } finally {
            setDeleting(false);
            setDeleteOpen(false);
            setOpen(false);
        }

        await reloadChannels();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
            if (open) {
                setName(channel.name || "");
            }
        }, [open, channel]);

    if (!activeWorkspace) return null;

    return (
        <div ref={menuRef} className="relative" onMouseLeave={() => {
            if (menuRef.current && !menuRef.current.contains(document.activeElement)) {
                setOpen(false);
            }
        }}
        >

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Escape") setOpen(false);
                }}
                className="text-gray-400 hover:text-white px-1 font-bold"
            >
                ⋯
            </button>

            {open && (
                <div className="absolute right-0 mt-1 bg-gray-800 text-sm rounded border shadow-lg w-32">

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditing(true);
                            setOpen(false);
                        }}                        
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                    >
                        Rename
                    </button>

                    {isOwner && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeleteOpen(true);
                                setOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-red-400"
                        >
                            Delete
                        </button>
                    )}

                </div>
            )}

            {/* Delete Modal */}
            <DeleteConfirmationModal
                open={deleteOpen}
                title="Delete Channel"
                message={`Are you sure you want to delete #${channel.name}? This cannot be undone!`}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteOpen(false)}
                loading={deleting}
            />

            {/* Rename Modal */}
            <RenameModal
                open={editing}
                title="Rename Channel"
                initialValue={name}
                setValue={(value) => setName(value)}
                onSave={handleRename}
                onCancel={() => {
                    setEditing(false);
                    setOpen(false);
                }}
                loading={isRenaming}
            />

            {/* {editing && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

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
                        className="bg-white text-gray-700 rounded-lg p-6 w-96 animate-[scaleIn_.15s_ease]">

                        <h2 className="font-semibold mb-3">Rename Channel</h2>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border px-3 py-2 w-full rounded"
                            autoFocus
                        />

                        <div className="flex justify-end gap-2 mt-4">

                            <buttoncxbx
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

export default ChannelMenu;