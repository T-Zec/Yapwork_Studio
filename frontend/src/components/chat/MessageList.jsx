import { useEffect, useState } from "react";
import { fetchMessages } from "../../api/messageService";
import { useParams } from "react-router-dom";

const MessageList = () => {
    const { workspaceId, channelId } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            try {
                const data = await fetchMessages(workspaceId, channelId);
                setMessages(data);
            } catch (error) {
                console.error("Failed to load messages", error);
            }
        };
        loadMessages();
    }, [workspaceId, channelId]);

    return (
        <div className="space-y-3 p-2">
            {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">

                    <span className="text-sm font-semibold">
                        {msg.sender?.username || "User"}
                    </span>

                    <span className="text-gray-700">
                        {msg.content}
                    </span>

                </div>
            ))}
        </div>
    );
};

export default MessageList;