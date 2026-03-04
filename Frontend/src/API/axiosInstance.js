import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4002/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Enable sending cookies with requests
});

// ✅ Automatically attach token from cookie or localStorage
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Handle 401 errors (redirect to login)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;