import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspaceHome = () => {
    const { activeWorkspace } = useWorkspace();

    if (!activeWorkspace) {
        return <div>Select a workspace</div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                {activeWorkspace.name}
            </h1>

            <p className="text-gray-600">
                Select a channel or feature from the sidebar.
            </p>
        </div>
    );
};

export default WorkspaceHome;