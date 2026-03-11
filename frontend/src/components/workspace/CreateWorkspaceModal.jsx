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
        <div className="fixed max-h-screen inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white text-gray-700 rounded-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Create Workspace</h2>

                <form onSubmit={handleCreate} className="flex flex-col gap-3">

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace name"
                        className="border rounded px-3 py-2"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (optional)"
                        className="border rounded px-3 py-2"
                    />

                    <div className="flex justify-end gap-2 mt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500"
                        >
                            Cancle
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
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