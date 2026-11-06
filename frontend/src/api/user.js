import { userAPI, authAPI } from "./apiClient";

export const getProfile = userAPI.getProfile;

export const updateProfile = userAPI.updateProfile;

export const changePassword = authAPI.changePassword;
