import { useEffect, useState } from "react";
import { 
    fetchWorkspaces, 
    createWorkspace, 
    updateWorkspace,
    deleteWorkspace, 
} from "../../api/workspaceService";
import WorkspaceItem from "../../components/workspace/WorkspaceItem";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [workspaces, setWorkspaces] = useState([]);
    const [name, setName] = useState("");

    const loadWorkspaces = async () => {
        try {
            const data = await fetchWorkspaces();
            setWorkspaces(data);
        } catch (error) {
            console.error(error);
            setWorkspaces([]);
        }
    };

    useEffect(() => {loadWorkspaces();}, []);

    const handleCreate = async () => {
        if (!name) return;

        try {
            await createWorkspace({ name });
            setName("");
            loadWorkspaces();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-10 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {user?.username}'s Workspaces
                </h1>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                <div className="flex gap-2">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Workspace name"
                        className="border p-2 rounded"
                    />
                    <button onClick={handleCreate} className="bg-black text-white px-4 rounded">Create</button>
                </div>

                <div className="space-y-2">
                    {workspaces.length === 0 ? (
                        <p>No workspaces yet.</p>
                    ) : (
                        workspaces.map((ws) => (
                            <WorkspaceItem
                                key={ws.id}
                                workspace={ws}
                                refresh={loadWorkspaces}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;