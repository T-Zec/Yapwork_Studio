import { Outlet } from "react-router-dom";
import WorkspaceSidebar from "../components/sidebar/WorkspaceSidebar";
import WorkspacePanel from "../components/sidebar/WorkspacePanel";
import LoadingScreen from "../components/common/LoadingScreen";
import { useWorkspace } from "../context/WorkspaceContext";
import bgImage from "../assets/background/background.jpg";

const DashboardLayout = () => {
    const { loading } = useWorkspace();

    return (
        <div className={`${loading ? "pointer-events-none select-none" : ""}`}>
            {loading && (
                <LoadingScreen text="Loading Workspace..." />
            )}
            {<div className="flex h-screen overflow-hidden">

                {/* Workspace Switcher */}
                <WorkspaceSidebar />

                {/* Workspace Navigation */}
                <WorkspacePanel />

                {/* Main Layout */}
                <main className="flex-1 overflow-hidden">

                    <div className="absolute inset-0 -z-10">

                        <img 
                            src={bgImage} 
                            alt="bg" 
                            className="w-full h-full object-cover"
                        />
                        {/* <div className="absolute inset-0 bg-black/30" /> */}

                    </div>

                    <div className="relative z-10 h-full p-6 overflow-y-auto">
                        <Outlet />
                    </div>


                </main>

            </div>}
        </div>
    );
};

export default DashboardLayout;