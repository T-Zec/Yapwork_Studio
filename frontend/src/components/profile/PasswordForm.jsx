import { useState } from "react";
import { changePassword } from "../../api/userService";

const PasswordForm = () => {
    const [passwords, setPasswords] = useState({
        old_password: "",
        new_password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await changePassword(passwords);
            
        } catch (error) {
            console.error("Failed to change password", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">

            <h2 className="font-semibold mb-3">
                Change Passwored
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2">

                <input
                    type="password"
                    placeholder="Current Password"
                    onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                    className="border px-3 py-2 w-full rounded"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                    className="border px-3 py-2 w-full rounded"
                />

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
                    Update Password
                </button>
            </form>

        </div>
    );
};

export default PasswordForm;