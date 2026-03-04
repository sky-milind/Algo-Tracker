import Cookies from 'js-cookie';

// Get user from localStorage
export const getUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

// Save user to localStorage only (authToken is in HTTP-only cookie from backend)
export const saveUser = (userData, token = null) => {
  // Store only essential user data in localStorage
  const userInfo = {
    id: userData.id,
    username: userData.username,
    full_name: userData.full_name,
    role: userData.role
  };
  
  localStorage.setItem('user', JSON.stringify(userInfo));
  
  // Store token separately if provided (for Authorization header)
//   if (token) {
//     localStorage.setItem('token', token);
//   }
};

// Remove user from storage
export const removeUser = () => {
  // Remove from localStorage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  
  // Remove client-side cookies (but authToken is HTTP-only, cleared by server)
  Cookies.remove('authToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getUser() !== null || Cookies.get('authToken') !== undefined;
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token') || null;
};
