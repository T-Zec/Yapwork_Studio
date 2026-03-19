const Modal = ({ title, children, onClose }) => {
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

        <div className="bg-white rounded-lg shadow-lg w-96 p-5">

            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                    {title}
                </h2>

                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-700"
                >
                    Cancel
                </button>

                {children}

            </div>

        </div>

    </div>
};

export default Modal;