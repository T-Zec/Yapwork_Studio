import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import WorkspaceHome from "../pages/workspace/WorkspaceHome";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ChatPage from "../pages/chat/ChatPage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                
                {/* Public Routes */}
                <Route path="/" />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>

                        <Route path="/dashboard" element={<WorkspaceHome />} />
                        <Route path="/workspaces/:workspaceId/channels/:channelId" element={<ChatPage />} />

                    </Route>
                    <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}