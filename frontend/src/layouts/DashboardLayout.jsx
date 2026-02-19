import { Outlet } from "react-router-dom";

function DashboardLayout() {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-4">
                <h2 className="text-x1 font-bold">Yapwork</h2>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;