const DeleteConfirmationModal = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    loading = false
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white text-gray-700 rounded-lg p-6 w-96 shadow-lg">

                <h2 className="text-lg font-semibold mb-2">
                    {title}
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="text-gray-500"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default DeleteConfirmationModal;