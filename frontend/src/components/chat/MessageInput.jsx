import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../api/messageService";

const MessageInput = ({ setMessages }) => {
    const { workspaceId, channelId } = useParams();
    
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!content.trim() && !file) return;

        try {
            const formData = new FormData();

            if (content) formData.append("content", content);
            if (file) formData.append("attachment", file);

            const newMessage = await sendMessage(
                workspaceId, 
                channelId, 
                formData
            );

            setMessages((prev) => [...prev, newMessage]);

            setContent("");
            setFile(null);
            fileInputRef.current.value = "";
            
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <form 
            onSubmit={handleSend} 
            className="p-2 select-none"
        >

            {/* File Preview */}
            {file && (
                <div className="mt-2 text-xs text-gray-600 flex items-center gap-2">
                    📎 {file.name}
                    <button 
                        type="button"
                        onClick={() => {
                            setFile(null);
                            fileInputRef.current.value == "";
                        }}
                        className="text-red-500"
                    >
                        remove
                    </button>
                </div>
            )}
            
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-white/40">

                {/* Attachment Button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="w-8 h-8 text-gray-500 hover:text-blue-500 hover:bg-blue-100/40 transition text-lg rounded"
                >
                    +
                </button>
                
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Send a message..."
                    className="flex-1 text-gray-800 outline-none text-sm bg-transparent"
                />

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1.5 text-sm hover:scale-95 rounded transition"
                >
                    Send
                </button>
            </div>
        </form>
    );
};

export default MessageInput;