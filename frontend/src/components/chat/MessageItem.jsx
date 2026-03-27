import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { deleteMessage, editMessage } from "../../api/messageService";
import { formateTimestamp } from "../../utils/formatTime";

const MessageItem = ({ message, previousMessage, setMessages }) => {
    const { user } = useAuth();
    const { workspaceId, channelId } = useParams();

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(message.content);

    const sameUser = previousMessage && previousMessage.sender?.id === message.sender?.id;

    const handleEdit = async () => {
        try {
            const updated = await editMessage(
                workspaceId,
                channelId,
                message.id,
                { content: text }
            );

            setMessages((prev) => 
                prev.map((m) => 
                    m.id === message.id ? updated : m
                )
            );

            setEditing(false);
        } catch (error) {
            console.error("Failed to edit message", error);
        }
    };

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
        <div className={`group flex gap-3 hover:bg-gray-100 rounded ${sameUser ? "py-1" : "py-2"}`}>
            
            <div className="w-8 h-8 flex items-center justify-center">
                {!sameUser && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs">
                        {message.sender?.username?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col flex-1">

                {!sameUser && (
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate min-w-[120px] break-all">
                            {message.sender?.username}
                        </span>

                        <span className="text-xs text-gray-400">
                            {formateTimestamp(message.created_at)}
                        </span>
                    </div>
                )}

                <span className="text-sm">
                    {editing ? (
                        <div className="flex gap-2 mt-1">
                            <input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                autoFocus={true}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        event.preventDefault();
                                        handleEdit();
                                    } else if (event.key === 'Escape') {
                                        setEditing(false);
                                    }
                                }}
                                className="border rounded px-2 py-1 text-sm flex-1"
                            />

                            <button 
                                onClick={handleEdit}
                                className="text-xs text-green-600"
                            >
                                save
                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="text-xs text-gray-500"
                            >
                                cancel
                            </button>
                        </div>
                    ) : (
                        <span className="text-sm">
                            {message.content}
                        </span>
                    )}

                    {message.attachment && (
                        <div className="mt-2">
                            
                            {message.attachment.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                <img
                                    src={message.attachment}
                                    alt="attachment"
                                    className="max-w-xs rounded border"
                                />
                            ) : (
                                <div className="border rounded-lg p-2 bg-gray-50 flex items-center justify-between max-w-xs select-none">

                                    <span className="text-sm truncate">
                                        📎 {message.attachment.split("/").pop()}
                                    </span>

                                    <a
                                        href={message.attachment}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 text-xs underline"
                                    >
                                        Download
                                    </a>
                                    
                                </div>
                            )}
                        </div>
                    )}
                </span>

            </div>

            {isOwner && !editing && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 text-xs">

                    <button
                        onClick={() => setEditing(true)}
                        className="text-blue-500"
                    >
                        edit
                    </button>

                    <button
                        onClick={handleDelete}
                        className="text-red-500"
                    >
                        delete
                    </button>

                </div>
            )}
        
        </div>
    );
};

export default MessageItem;