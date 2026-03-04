import { useState } from "react";
import {
    deleteWorkspace,
    updateWorkspace,
} from "../../api/workspaceService";

const WorkspaceItem = ({ workspace, refresh }) => {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(workspace.name);

    const handleUpdate = async () => {
        await updateWorkspace(workspace.id, { name });
        setEditing(false);
        refresh();
    };

    const handleDelete = async () => {
        await deleteWorkspace(workspace.id);
        refresh();
    };

    return (
        <div className="border p-3 rounded shadow-sm flex justify-between items-center">
            {editing ? (
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.name)}
                    className="border p-1 rounded"
                />
            ) : (
                <span>{workspace.name}</span>
            )}

            <div className="space-x-2">
                {editing ? (
                    <button onClick={handleUpdate} className="text-green-600">Save</button>
                ) : (
                    <button onClick={() => setEditing(true)} className="text-blue-600">Edit</button>
                )}
                    <button onClick={handleDelete} className="text-red-600">Delete</button>
            </div>
        </div>
    );
};

export default WorkspaceItem;