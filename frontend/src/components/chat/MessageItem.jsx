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
        <div className={`group flex text-gray-800 rounded ${sameUser ? "py-1" : "py-2"}`}>
            
            <div className="w-8 h-8 flex items-center justify-center">
                {!sameUser &&  (
                    <div className="w-8 h-8 mb-2 rounded-full bg-blue-400 font-bold flex items-center justify-center text-white text-xs">
                        {message.sender?.username?.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col justify-center flex-1">

                {!sameUser && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold px-2 text-sm truncate min-w-[120px] break-all">
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
                                className="bg-transparent rounded px-2 py-1 text-sm flex-1 outline-2 outline-dotted outline-gray-800"
                            />

                            <button 
                                onClick={handleEdit}
                                className="text-xs text-green-600 bg-gray-100/60 p-2 rounded"
                            >
                                save
                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="text-xs text-gray-500 bg-gray-100/60 p-2 rounded"
                            >
                                cancel
                            </button>
                        </div>
                    ) : (
                        message.content !== "" && (
                            <span className="text-sm rounded-lg p-2 bg-gray-200/40 hover:bg-gray-200/80 cursor-default">
                                {message.content}
                            </span>
                        )
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
                                <div className="rounded-lg p-2 bg-gray-200/40 hover:bg-gray-200/80 flex items-center justify-between max-w-xs select-none">

                                    <span title={message.attachment.split("/").pop()} className="text-sm truncate">
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

            <div className={`flex gap-2 opacity-0 group-hover:opacity-100 text-xs ${editing && "group-hover:hidden"}`}>
                {isOwner && !editing && message.content && (
                    <button
                        onClick={() => setEditing(true)}
                        className="text-blue-600 bg-gray-100/60 p-2 rounded"
                    >
                        edit
                    </button>
                )}
                {isOwner && !editing && (

                    <button
                        onClick={handleDelete}
                        className="text-red-500 bg-gray-100/60 p-2 rounded"
                    >
                        delete
                    </button>

                )}
            </div>
        
        </div>
    );
};

export default MessageItem;