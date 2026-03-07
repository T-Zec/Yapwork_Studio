import { createContext, useContext, useEffect, useState } from "react";
import { fetchWorkspaces } from "../api/workspaceService";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [channels, setChannels] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadWorkspaces = async () => {
        try {
            const data = await fetchWorkspaces();
            setWorkspaces(data);

            // Automatically select first workspace if none active
            if (data.length > 0 && !activeWorkspace) {
                setActiveWorkspace(data[0]);
            }
        } catch (error) {
            console.error("Failed to load workspaces", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWorkspaces();
    }, []);

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