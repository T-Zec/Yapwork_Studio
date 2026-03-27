import { useWorkspace } from "../../context/WorkspaceContext";
import WorkspaceMenu from "../workspace/WorkspaceMenu";
import ChannelList from "./ChannelList";

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
        <div className="w-64 h-full flex flex-col bg-gray-800 text-white p-4 select-none">
            <h2 className="font-bold text-lg mb-4">
                <WorkspaceMenu workspace={activeWorkspace} />
            </h2>

            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hidden">
                <ChannelList />
            </div>
            
        </div>
    );
};

export default WorkspacePanel;