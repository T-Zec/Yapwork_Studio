import { useState, useRef, useEffect } from "react";
import { updateChannel, deleteChannel } from "../../api/channelService";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useAuth } from "../../context/AuthContext";


const ChannelMenu = ({ channel, reloadChannels }) => {
    const { activeWorkspace } = useWorkspace();
    const { user } = useAuth();

    const menuRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(channel.name);

    const isOwner = activeWorkspace?.created_by === user?.id;

    if (!activeWorkspace) return null;

    const handleRename = async () => {
        if (!name.trim()) return;

        try {
            await updateChannel(activeWorkspace.id, channel.id, { name });

            setEditing(false);
            setOpen(false);
            reloadChannels();

        } catch (error) {
            console.error("Failed to rename channel", error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this channel?")) return;

        try {
            await deleteChannel(activeWorkspace.id, channel.id);
            reloadChannels();
        } catch (error) {
            console.error("Failed to delete channel", error);
        }

        reloadChannels();
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

    return (
        <div ref={menuRef} className="relative">

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
                        onClick={() => {
                            setEditing(true);
                            setOpen(false);
                        }}                        
                        className="block w-full text-left px-3 py-2 hover:bg-gray-700"
                    >
                        Rename
                    </button>

                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-700 text-red-400"
                        >
                            Delete
                        </button>
                    )}

                </div>
            )}

            {/* Rename Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

                    <div
                        onKeyDown={(event) => {
                            if (event.key === "Escape") {
                                setOpen(false);
                            }
                        }} 
                        className="text-gray-700 bg-white p-6 rounded-lg w-96 animate-[scaleIn_.15s_ease]">

                        <h2 className="font-semibold mb-3">Rename Channel</h2>

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
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Save
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default ChannelMenu;