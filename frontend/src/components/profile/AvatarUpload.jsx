import { useState } from "react";
import { uploadAvatar } from "../../api/userService";

const AvatarUpload = () => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        await uploadAvatar(formData);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-3">Avatar</h2>
            <div className="flex items-center justify-between">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    onClick={handleUpload}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                    Upload
                </button>
           </div>

        </div>
    );
};

export default AvatarUpload;