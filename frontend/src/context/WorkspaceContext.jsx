import { createContext, useContext, useEffect, useState } from "react";
import { fetchWorkspaces } from "../api/workspaceService";
import { useAuth } from "./AuthContext";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [channels, setChannels] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const loadWorkspaces = async () => {
        try {
            const data = await fetchWorkspaces();
            setWorkspaces(data);

            // Automatically select first workspace if none active
            setActiveWorkspace((prev) => {
                if (prev && data.find((ws) => ws.id === prev.id)) {
                    return prev;
                }
                return data[0] || null;
            });
            
        } catch (error) {
            console.error("Failed to load workspaces", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setWorkspaces([]);
            setChannels([]);
            setActiveWorkspace(null);
        }

        loadWorkspaces();
    }, [user]);

    const switchWorkspace = (workspace) => {
        setActiveWorkspace(workspace);
    };

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                activeWorkspace,
                channels,
                setChannels,
                setWorkspaces,
                setActiveWorkspace,
                switchWorkspace,
                reloadWorkspaces: loadWorkspaces,
                loading,
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => useContext(WorkspaceContext);