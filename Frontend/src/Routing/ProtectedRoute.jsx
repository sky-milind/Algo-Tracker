import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user's role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect to user's appropriate dashboard based on their role
    const redirectPath = userRole === 'superadmin' 
      ? '/superadmin/dashboard' 
      : '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and has the right role
  return children;
};

export default ProtectedRoute;
