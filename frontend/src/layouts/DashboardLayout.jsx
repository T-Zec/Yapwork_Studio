import { Outlet, useNavigate } from "react-router-dom";
import WorkspaceSidebar from "../components/sidebar/WorkspaceSidebar";
import WorkspacePanel from "../components/sidebar/WorkspacePanel";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
};

    return (
        <div className="flex h-screen">

            {/* Workspace Switcher */}
            <WorkspaceSidebar />

            {/* Workspace Navigation */}
            <WorkspacePanel />

            {/* Main Layout */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>

                <Outlet />

            </main>

        </div>
    );
};

export default DashboardLayout;