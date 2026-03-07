import { useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../api/messageService";

const MessageInput = ({ onMessageSent }) => {
    const { workspaceId, channelId } = useParams();
    const [text, setText] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        try {
            await sendMessage(workspaceId, channelId, {
                content: text,
            });
            setText("");

            if (onMessageSent) onMessageSent();
            
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <form onSubmit={handleSend} className="flex gap-2">

            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded px-3 py-2"
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 rounded"
            >
                Send
            </button>

        </form>
    );
};

export default MessageInput;