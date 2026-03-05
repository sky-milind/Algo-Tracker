import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const PublicRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // If user is authenticated, redirect to their dashboard
  if (authenticated) {
    const redirectPath = userRole === 'superadmin' 
      ? '/superadmin/dashboard' 
      : '/admin/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  // User is not authenticated, show the public page (login)
  return children;
};

export default PublicRoute;
