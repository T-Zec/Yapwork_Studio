import { useState } from "react";
import { deleteAccount } from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import DeleteConfirmationModal from "../common/DeleteConfirmationModal";

const DangerZone = () => {
    const { logout } = useAuth();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            await deleteAccount();            
            logout();

        } catch (error) {
            console.error("Failed to delete the account", error);

        } finally {
            setDeleteOpen(false);
            setDeleting(false);
        }
    };

    return (
        <div className="bg-red-50 p-4 rounded shadow border border-red-200 select-none">

            <h2 className="font-semibold text-red-500 mb-2">
                Danger Zone
            </h2>

            <div className="flex justify-between items-center mb-2">
                <span>User Logout</span>
                <button
                    onClick={logout}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="flex justify-between items-center">
                <span>Delete Account</span>
                <button
                    onClick={() => setDeleteOpen(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>                
            </div>

            {/* Delete Modal */}
            <DeleteConfirmationModal
                open={deleteOpen}
                title="Delete Account"
                message={`Are you sure you want to delete your account?`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteOpen(false)}
                loading={deleting}
            />

        </div>
    );
};

export default DangerZone;