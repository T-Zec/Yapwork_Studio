const ChannelSkeleton = () => {
    return (
        <div className="space-y-2 mt-2">

            {[...Array(5)].map((_, i) => (
                <div 
                    key={i}
                    className="h-4 w-3/4 bg-gray-700 rounded animate-smooth-pulse"
                />
            ))}
            
        </div>
    );
};

export default ChannelSkeleton;