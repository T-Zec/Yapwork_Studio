import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import RenameModal from "../common/RenameModal";


const ProfileEditModal = ({ open, onClose }) => {
    const { user } = useAuth();

    const [username, setUsername] = useState(user?.username || "");
    const [loading, setLoading] = useState(false);

    const children = (
        <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-3 py-2 w-full rounded"
            autoFocus
        />
    );

    if (!open) return null;

    const handleSave = async () => {
        if (!username.trim()) return;
        
        try {
            setLoading(true);
            // TODO: API call later
            alert("Updating username...", username);
            onClose();
        } catch (error) {
            console.error("Failed to update username", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>

            <RenameModal
                open={open}
                title = {"Edit Profile"}
                initialValue={username}
                setValue={setUsername}
                onSave={handleSave}
                onCancel={onClose}
                loading={loading}
                placeholder = "Type new name..."
            />

        </div>
    );
};

export default ProfileEditModal;