import { useParams } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";
import Breadcrumb from "../../components/navigation/Breadcrumb";

const ChatPage = () => {
    const { workspaceId, channelId } = useParams();
    const { activeWorkspace } = useWorkspace();

    return (
        <div className="flex flex-col h-full">

            <Breadcrumb
                items={[
                    activeWorkspace?.name, `Channel ${channelId}`
                ]}
            />

            <div className="border-b pb-3 mb-3">
                <h2 className="text-xl font-semibold">
                    Channel Chat
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto">Messages appear here</div>

            <div className="border-t pt-3">Message input area</div>
        </div>
    );
};

export default ChatPage;