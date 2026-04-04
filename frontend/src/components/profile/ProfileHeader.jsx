import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileEditModal from "./ProfileEditModal";

const ProfileHeader = () => {
    const { user } = useAuth();

    const [editOpen, setEditOpen] = useState(false);

    return (
        <div>           
            
            <div className="bg-white p-4 rounded-lg shadow">

                <h2 className="font-semibold mb-3">Account</h2>

                <div className="flex justify-between items-center gap-4 mb-4">
                    <span className="w-9 h-9 bg-blue-500 text-white font-semibold text-xl rounded-full flex items-center justify-center select-none">
                        {user?.username?.charAt(0).toUpperCase()}
                    </span>
                    
                    <div className="flex-1">
                        <p className="font-medium">{user?.username}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <button
                        onClick={() => setEditOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                    >
                        Edit
                    </button>
                </div>
                
            </div>

            <ProfileEditModal 
                open={editOpen}
                onClose={() => setEditOpen(false)}
            />
            
        </div>
    );
};

export default ProfileHeader;