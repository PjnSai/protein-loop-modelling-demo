import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../api/apiClient";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const {
    user,
    isAuthenticated,
    isLoading,
    refreshUser,
    logout,
    setAuthenticatedUser,
    signInAsDemo,
  } = context;

  const login = async (credentials) => {
    try {
      const { ok, data } = await apiClient.login(credentials);
      if (ok) {
        // Don't set authenticated state yet - wait for OTP verification
        return { success: true, data };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const { ok, data } = await apiClient.verifyOTP(email, otp);
      if (ok) {
        setAuthenticatedUser(data.user);
        await refreshUser();
        return { success: true, data };
      } else {
        return { success: false, error: data.error || "Invalid OTP" };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logoutUser = async () => {
    try {
      const result = await logout();
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const checkAuthStatus = async () => {
    try {
      await refreshUser();
      return { success: true, isAuthenticated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const hasPermission = () => {
    return isAuthenticated;
  };

  return {
    user,
    isAuthenticated,
    isLoading,

    login,
    verifyOTP,
    logout: logoutUser,
    refreshUser,
    checkAuthStatus,
    signInAsDemo,

    hasPermission,

    userEmail: user?.email,
    userId: user?.id,
    isGuest: !isAuthenticated,
  };
};

export default useAuth;
