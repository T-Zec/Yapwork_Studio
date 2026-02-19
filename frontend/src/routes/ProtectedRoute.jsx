import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const isAuthenticated = true; // Temp

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;