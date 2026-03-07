import { useParams } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";
import Breadcrumb from "../../components/navigation/Breadcrumb";
import MessageList from "../../components/chat/MessageList";
import MessageInput from "../../components/chat/MessageInput";
import { useState } from "react";

const ChatPage = () => {
    const { channelId } = useParams();
    const { activeWorkspace } = useWorkspace();
    
    const [messages, setMessages] = useState([]);

    return (
        <div className="flex flex-col h-full">

            <Breadcrumb
                items={[
                    activeWorkspace?.name,
                    `#${channelId}`
                ]}
            />

            {/* <div className="border-b pb-3 mb-3">
                <h2 className="text-xl font-semibold">
                    Channel Chat
                </h2>
            </div> */}

            <div className="flex-1 overflow-y-auto">
                <MessageList 
                    messages={messages}
                    setMessages={setMessages}
                />
            </div>

            <div className="border-t pt-3">
                <MessageInput
                    setMessages={setMessages}
                />
            </div>
        </div>
    );
};

export default ChatPage;