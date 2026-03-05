import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const RoleBasedRedirect = () => {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // If not authenticated, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (userRole === 'superadmin') {
    return <Navigate to="/superadmin/dashboard" replace />;
  } else if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Fallback to login if role is unknown
  return <Navigate to="/login" replace />;
};

export default RoleBasedRedirect;
