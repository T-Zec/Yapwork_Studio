import { createContext, useContext, useEffect, useState } from "react";
import { fetchWorkspaces } from "../api/workspaceService";
import { useAuth } from "./AuthContext";
import { setItem, getItem } from "../utils/appStorage";

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [channels, setChannels] = useState([]);
    const [activeWorkspace, setActiveWorkspace] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const loadWorkspaces = async () => {
        try {
            setLoading(true);

            const data = await fetchWorkspaces();
            setWorkspaces(data);

            const savedWorkspaceId = getItem("lastWorkspaceId");
            let selectedWorkspace = null;

            if (savedWorkspaceId) {
                selectedWorkspace = data.find((ws) => ws.id === savedWorkspaceId);
            }

            if (!selectedWorkspace && data.length > 0) {
                selectedWorkspace = data[0];
            }

            if (selectedWorkspace) {
                setActiveWorkspace(selectedWorkspace);
            }

            // Automatically select first workspace if none active
            // setActiveWorkspace((prev) => {
            //     if (prev && data.find((ws) => ws.id === prev.id)) {
            //         return prev;
            //     }
            //     return data[0] || null;
            
        } catch (error) {
            console.error("Failed to load workspaces", error);

        } finally {
            setLoading(false);
        }
    };

    const switchWorkspace = (workspace) => {
        const start = Date.now();

        setLoading(true);

        try {
            setActiveWorkspace(workspace);
            setItem("lastWorkspaceId", workspace.id);
        } catch (error) {
            console.log("Error while switching workspace", error);
        } finally {
            const elapsed = Date.now() - start;

            const delay = Math.max(500 - elapsed, 150);

            setTimeout(() => {
                setLoading(false);
            }, delay);
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