import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspaceSidebar = () => {
    const { workspaces, switchWorkspace } = useWorkspace();

    return (
        <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-3">

            {workspaces.map((ws) => (
                <button
                    key={ws.id}
                    onClick={() => switchWorkspace(ws)}
                    className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center"
                >
                    {ws.name.charAt(0).toUpperCase()}
                </button>
            ))}

        </div>
    );
};

export default WorkspaceSidebar;