import { useState } from "react";
import { createWorkspace } from "../../api/workspaceService";
import { useWorkspace } from "../../context/WorkspaceContext";

const CreateWorkspaceModal = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { setWorkspaces } = useWorkspace();

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!name) return;


    // Sync value when modal opens
        try {
            const newWorkspace = await createWorkspace({name, description});
            setWorkspaces((prev) => [...prev, newWorkspace]);

            setName("");
            setDescription("");

            onClose();
        } catch (error) {
            console.error("Failed to create workspace", error);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center select-none z-50">
            <div
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault();
                        setName("");
                        setDescription("");
                        onClose();
                    }
                    if (event.key === "Enter") {
                        handleCreate();
                    }
                }} 
                className="bg-white text-gray-700 rounded-lg p-6 w-96 animate-[scaleIn_.15s_ease]">
                <h2 className="text-lg font-semibold mb-4">Create Workspace</h2>

                <form onSubmit={handleCreate} className="flex flex-col gap-3">

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace name"
                        className="border rounded px-3 py-2 select-text"
                        autoFocus
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="border rounded px-3 py-2 select-text"
                    />

                    <div className="flex justify-end gap-2 mt-3">

                        <button
                            type="button"
                            onClick={() => {
                                setName("");
                                setDescription("");
                                onClose();
                            }}
                            className="text-gray-500"
                        >
                            Cancle
                        </button>

                        <button
                            type="submit"
                            className={`text-white px-4 py-2 rounded
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

export default CreateWorkspaceModal;