import { useEffect } from "react";

const BaseModal = ({
    open,
    title,
    children,
    onClose,
    onConfirm,
    confirmingText = "Processing...",
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false
}) => {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Enter" && !loading) onConfirm?.();
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, loading, onConfirm, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" tabIndex={-1}>
            <div className="bg-white text-gray-700 rounded-lg p-6 w-96 shadow-lg animate-[scaleIn_.15s_ease]">

                <h2 className="text-lg font-semibold mb-3">
                    {title}
                </h2>

                <div className="mb-4">{children}</div>

                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="text-gray-500"
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`text-white px-4 py-1 rounded
                            ${!loading ? 
                                        "bg-blue-500 hover:bg-blue-600" : 
                                        "bg-gray-400 cursor-not-allowed"}
                        `}
                    >
                        {loading ? confirmingText : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;