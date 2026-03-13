import  { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { loginRequest, registerRequest, refreshRequest, getCurrentUser } from "../api/authService";
import { getRefreshToken, setRefreshToken, clearTokens } from "../utils/tokenStorage";
import { useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const hasInitialized = useRef(false);

    const login = async (credentials) => {
        try {
            const data = await loginRequest(credentials);

            setAccessToken(data.access);
            setRefreshToken(data.refresh);
            
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
            
            const userData = await getCurrentUser();
            setUser(null);
            setUser(userData);

        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (formData) => {
        setUser(null);
        await registerRequest(formData);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        
        setUser(null);
        setAccessToken(null);
        clearTokens();

        delete axiosInstance.defaults.headers.common["Authorization"];
    };

    // Refresh attempt on app load
    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;
        
        const initializeAuth = async () => {
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                setLoading(false);
                return;
            }
            
            try {
                const data = await refreshRequest(refreshToken);
                setAccessToken(data.access);

                axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                logout();
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);