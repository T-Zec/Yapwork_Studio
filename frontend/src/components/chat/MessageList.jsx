import { useEffect, useState, useRef } from "react";
import { fetchMessages } from "../../api/messageService";
import { useParams } from "react-router-dom";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, setMessages }) => {
    const { workspaceId, channelId } = useParams();

    const containerRef = useRef(null);
    const bottomRef = useRef(null);

    const initialLoadRef = useRef(true);
    const loadingOlderRef = useRef(false);
    
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const loadMessages = async (pageNumber = 1, prepend = false) => {
        try {
            setLoading(true);

            const container = containerRef.current;
            const previousHeight = container?.scrollHeight || 0;

            const data = await fetchMessages(workspaceId, channelId, pageNumber);
            const ordered = [...data.results].reverse();

            if (prepend) {
                setMessages((prev) => [...ordered, ...prev]);
            } else {
                setMessages(ordered);
            }

            setHasNext(Boolean(data.next));
            setPage(pageNumber);

            if (prepend && container) {
                requestAnimationFrame(() => {
                    const newHeight = container.scrollHeight;
                    container.scrollTop = newHeight - previousHeight;
                });
            }

        } catch (error) {
            console.error("Failed to load messages", error);
        } finally {
            setLoading(false);
        }
    };
    
    const loadOlderMessages = async () => {
        if (!hasNext || loading) return;

        loadingOlderRef.current = true;

        await loadMessages(page + 1, true);
    };

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        if (container.scrollTop === 0 && hasNext && !loading) {
            loadOlderMessages();
        }
    };

    useEffect(() => {
        initialLoadRef.current = true;
        loadMessages(1, false);
    }, [workspaceId, channelId]);

    useEffect(() => {
        if (initialLoadRef.current) {
            bottomRef.current?.scrollIntoView();
            initialLoadRef.current = false;
            return;
        }

        if (!loadingOlderRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        loadingOlderRef.current = false;

    }, [messages]);

    return (
        <div
            ref={containerRef} 
            onScroll={handleScroll}
            className="flex flex-col gap-2 p-2 overflow-y-auto h-full">

            {/* {hasNext && (
                <button
                    onClick={loadOlderMessages}
                    className="text-xs text-blue-500"
                >
                    Load older messages
                </button>
            )} */}

            {loading && (
                <div className="space-y-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-3 bg-gray-300 rounded w-1/4 mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        </div>
                    ))}
                </div>
            )}

            {messages.length ? 
                (!loading && messages.map((msg, index) => (

                <MessageItem 
                    key={msg.id}
                    message={msg}
                    previousMessage={messages[index - 1]}
                    setMessages={setMessages}
                />

                ))) : (!loading &&
                    <div className="text-center text-gray-400 mt-12 select-none">
                        No messages yet. Start the conversation.
                    </div>
                )
            }

            <div ref={bottomRef} />
        </div>
    );
};

export default MessageList;