const LoadingScreen = ({ text = "Loading..." }) => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-3">

                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Text */}
                <p className="text-sm text-gray-600">
                    {text}
                </p>

            </div>

        </div>
    );
};

export default LoadingScreen;