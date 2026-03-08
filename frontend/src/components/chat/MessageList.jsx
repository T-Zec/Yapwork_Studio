import { useEffect, useState, useRef } from "react";
import { fetchMessages } from "../../api/messageService";
import { useParams } from "react-router-dom";

import MessageItem from "../../components/chat/MessageItem";

const MessageList = ({ messages, setMessages }) => {
    const { workspaceId, channelId } = useParams();
    const bottomRef = useRef(null);
    const containerRef = useRef(null);
    
    const [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);

    const handleScroll = () => {
        const container = containerRef.current;

        if (!container) return;

        if (container.scrollTop === 0 && nextPage) {
            const next = page + 1;
            setPage(next);
            loadMessages(next);
        }
    };
    
    const loadMessages = async (pageNumber = 1) => {
        try {
            const data = await fetchMessages(workspaceId, channelId, pageNumber);
            const ordered = [...data.results].reverse();

            if (pageNumber === 1) {
                setMessages(ordered);
            } else {
                setMessages((prev) => [
                    ...ordered,
                    ...prev
                ]);
            }

            setNextPage(data.next);
        } catch (error) {
            console.error("Failed to load messages", error);
        }
    };
    
    const loadOlderMessages = () => {
        if (!nextPage) return;

        const next = page + 1;
        setPage(next);
        loadMessages(next);
    };

    useEffect(() => {
        setPage(1);
        loadMessages(1);
    }, [workspaceId, channelId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);


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
        <div
            ref={containerRef} 
            onScroll={handleScroll}
            className="flex flex-col gap-3 p-2 overflow-y-auto h-full">

            {nextPage && (
                <button
                    onClick={loadOlderMessages}
                    className="text-xs text-blue-500"
                >
                    Load older messages
                </button>
            )}

            {messages.map((msg) => (
                <MessageItem 
                    key={msg.id}
                    message={msg}
                    setMessages={setMessages}
                />
            ))}

            <div ref={bottomRef}></div>
        </div>
    );
};

export default MessageList;