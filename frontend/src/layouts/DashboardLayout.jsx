import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/sidebar/WorkspaceSidebar";
import WorkspacePanel from "../components/sidebar/WorkspacePanel";

const DashboardLayout = () => {
    return (
        <div className="flex h-screen">

            {/* Workspace Switcher */}
            <WorkspaceSidebar />

            {/* Workspace Navigation */}
            <WorkspacePanel />

            {/* Main Layout */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;