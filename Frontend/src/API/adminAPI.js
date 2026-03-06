import axiosInstance from "./axiosInstance";

// Get all admins
export const getAllAdmins = async () => {
  const res = await axiosInstance.get("/admin");
  return res.data;
};

// Get admin by ID
export const getAdminById = async (id) => {
  const res = await axiosInstance.get(`/admin/${id}`);
  return res.data;
};

// Create new admin
export const createAdmin = async (adminData) => {
  const res = await axiosInstance.post("/admin", adminData);
  return res.data;
};

// Update admin
export const updateAdmin = async (id, adminData) => {
  const res = await axiosInstance.put(`/admin/${id}`, adminData);
  return res.data;
};

// Delete admin
export const deleteAdmin = async (id) => {
  const res = await axiosInstance.delete(`/admin/${id}`);
  return res.data;
};

// Get admins by creator (superadmin)
export const getAdminsByCreator = async (superadminId) => {
  const res = await axiosInstance.get(`/admin/creator/${superadminId}`);
  return res.data;
};
