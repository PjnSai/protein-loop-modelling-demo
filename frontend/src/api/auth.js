import { authAPI } from "./apiClient";

export const login = authAPI.login;

export const verifyOTP = authAPI.verifyOTP;

export const resendOTP = authAPI.resendOTP;

export const requestPasswordReset = authAPI.requestPasswordReset;

export const resetPassword = authAPI.resetPassword;

export const register = (email, password) =>
  authAPI.register({ email, password });
