import { useState } from "react";
import { createChannel } from "../../api/channelService";
import { useWorkspace } from "../../context/WorkspaceContext";


const CreateChannelModal = ({ open, onClose, reloadChannels }) => {
    const { activeWorkspace } = useWorkspace();
    const [name, setName] = useState("");

    const handleCreate = async (e) => {
        if (e) e.preventDefault();

        if(!name.trim()) return;

        try {
            await createChannel(activeWorkspace.id, { name });

            setName("");
            reloadChannels();
            onClose();

        } catch (error) {
            console.error("Couldn't create channel", error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault();
                        setName("");
                        onClose();
                    }
                    if (event.key === "Enter") {
                        handleCreate();
                    }
                }} 
                className="bg-white text-gray-700 rounded-lg p-6 w-96 animate-[scaleIn_.15s_ease]">

                <h2 className="font-semibold mb-3">Create Channel</h2>

                <form 
                    onSubmit={handleCreate}
                    className="space-y-3">

                    <input 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Channel name"
                        className="border px-3 py-2 w-full rounded"
                        autoFocus
                    />

                    <div className="flex justify-end gap-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={`text-white px-3 py-1 rounded
                                ${name.trim() ? 
                                        "bg-blue-500 hover:bg-blue-600" : 
                                        "bg-gray-400 cursor-not-allowed"}
                            `}
                        >
                            Create
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateChannelModal;