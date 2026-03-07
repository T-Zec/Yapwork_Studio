import { useEffect, useState } from "react";
import { fetchMessages } from "../../api/messageService";
import { useParams } from "react-router-dom";

const MessageList = () => {
    const { workspaceId, channelId } = useParams();

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);

    const loadMessages = async (pageNumber = 1) => {
        try {
            const data = await fetchMessages(workspaceId, channelId, pageNumber);

            if (pageNumber === 1) {
                setMessages(data.results);
            } else {
                setMessages((prev) => [...data.results, ...prev]);
            }

            setNextPage(data.next);
        } catch (error) {
            console.error("Failed to load messages", error);
        }
    };

    useEffect(() => {
        setPage(1);
        loadMessages(1);
    }, [workspaceId, channelId]);

    const loadOlderMessages = () => {
        if (!nextPage) return;

        const next = page + 1;
        setPage(next);
        loadMessages(next);
    };

    // useEffect(() => {
    //     const loadMessages = async () => {
    //         try {
    //             const data = await fetchMessages(workspaceId, channelId);
    //             setMessages(data);
    //         } catch (error) {
    //             console.error("Failed to load messages", error);
    //         }
    //     };
    //     loadMessages();
    // }, [workspaceId, channelId]);

    return (
        <div className="flex flex-col gap-3 p-2">

            {nextPage && (
                <button
                    onClick={loadOlderMessages}
                    className="text-xs text-blue-500"
                >
                    Load older messages
                </button>
            )}

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