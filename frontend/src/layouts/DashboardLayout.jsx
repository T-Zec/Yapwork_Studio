import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/sidebar/WorkspaceSidebar";
import WorkspacePanel from "../components/sidebar/WorkspacePanel";
import LoadingScreen from "../components/common/LoadingScreen";
import { useWorkspace } from "../context/WorkspaceContext";

const DashboardLayout = () => {
    const { loading } = useWorkspace();

    return (
        <div className={`${loading ? "pointer-events-none select-none" : ""}`}>
            {loading && (
                <LoadingScreen text="Loading Workspace..." />
            )}
            {<div className="flex h-screen">

                {/* Workspace Switcher */}
                <WorkspaceSidebar />

                {/* Workspace Navigation */}
                <WorkspacePanel />

                {/* Main Layout */}
                <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">

                    <Outlet />

                </main>

            </div>}
        </div>
    );
};

export default DashboardLayout;