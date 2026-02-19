import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-x1 shadow-md">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;