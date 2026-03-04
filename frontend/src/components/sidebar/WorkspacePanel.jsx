import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspacePanel = () => {
    const { activeWorkspace } = useWorkspace();

    if (!activeWorkspace) {
        return (
            <div className="w-64 bg-gray-800 text-white p-4">
                No workspace selected
            </div>
        );
    }

    return (
        <div className="w-64 bg-gray-800 text-white p-4">
            <h2 className="font-bold text-lg mb-4">
                {activeWorkspace.name}
            </h2>

            <p className="text-sm opacity-70">
                Channels appear here
            </p>
        </div>
    );
};

export default WorkspacePanel;