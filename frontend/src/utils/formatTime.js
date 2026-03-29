export const formateTimestamp = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (isToday) return `Today ${time}`;
    if (isYesterday) return `Yesterday ${time}`;

    return date.toLocaleTimeString();
    // return date.toLocaleTimeString() + " " + time;
};
// fix double time show up