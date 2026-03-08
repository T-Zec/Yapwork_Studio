import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { deleteMessage } from "../../api/messageService";

const MessageItem = ({ message, setMessages }) => {
    const { user } = useAuth();
    const { workspaceId, channelId } = useParams();

    const handleDelete = async () => {
        try {
            await deleteMessage(
                workspaceId,
                channelId,
                message.id
            );

            setMessages((prev) =>
                prev.filter((m) => m.id !== message.id)
            );
        } catch (error) {
            console.error("Failed to delete message", error);
        }
    };

    const isOwner = user?.id === message.sender?.id;

    return (
        <div className="group flex gap-3 hover:bg-gray-100 p-2 rounded">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
                {message.sender?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">
                        {message.sender?.username}
                    </span>

                    <span className="text-xs text-gray-400">
                        {new Date(message.created_at).toLocaleDateString()}
                    </span>
                </div>

                <span className="text-sm">
                    {message.content}
                </span>

            </div>

            {isOwner && (
                <button
                    onClick={handleDelete}
                    className="opacity-0 group-hover:opacity-100 text-xs text-red-500"
                >
                    delete
                </button>
            )}
        </div>
    );
};

export default MessageItem;