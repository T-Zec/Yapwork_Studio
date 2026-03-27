const Breadcrumb = ({ items = [] }) => {
    return (
        <div className="text-sm text-gray-500 mb-3 select-none truncate min-w-0">

            {items.map((item, index) => (
                <span key={index}>
                    {item}

                    {index < items.length - 1 && (
                        <span className="mx-2 text-gray-400">/</span>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;