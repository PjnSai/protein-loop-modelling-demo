import { createContext, useState, useEffect } from "react";
import apiClient from "../api/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { ok, data } = await apiClient.checkAuthStatus();

      if (ok) {
        setUser(data);
        setIsAuthenticated(true);
        console.log("User authenticated:", data.email);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        console.log("User not authenticated");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { ok } = await apiClient.logout();

      if (ok) {
        setUser(null);
        setIsAuthenticated(false);
        console.log("Logged out successfully");
        return { success: true };
      } else {
        console.error("Logout failed");
        return { success: false, error: "Logout failed" };
      }
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  const signInAsDemo = async () => {
    const { ok, data } = await apiClient.signInAsDemo();
    if (ok) {
      setUser(data.user);
      setIsAuthenticated(true);
    }
    return { success: ok };
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    refreshUser: fetchUser,
    logout,
    signInAsDemo,

    setAuthenticatedUser: (userData) => {
      setUser(userData);
      setIsAuthenticated(true);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
