import axiosInstance from "./axiosInstance";

// Unified login
export const Authentication = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  return res.data;
};

// Logout
export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};