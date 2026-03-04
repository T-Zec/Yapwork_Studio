import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspaceList = () => {
    const { workspaces, loading } = useWorkspace();

    if (loading) {
        return <div>Loading workspaces...</div>
    }

    if (!workspaces.length) {
        return <div>No workspaces found</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Chats</h1>

            <div className="grid gap-2">
                <span className="p-2 rounded-md bg-white shadow">chat 1</span>
                <span className="p-2 rounded bg-white shadow">chat 2</span>
                <span className="p-2 rounded bg-white shadow">chat 3</span>
            </div>
        </div>
    );
};

export default WorkspaceList;