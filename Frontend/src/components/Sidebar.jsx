import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, TrendingUp, Users, BarChart3, Settings, LogOut, X, UserCog, Shield } from 'lucide-react';
import { getUser, removeUser } from '../utils/auth';
import { logout as logoutAPI } from '../API/authAPI';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  // Role-based menu items
  const getSuperAdminMenuItems = () => [
    {
      name: 'Dashboard',
      path: '/superadmin/dashboard',
      icon: Home
    },
    {
      name: 'Manage Admins',
      path: '/superadmin/admins',
      icon: UserCog
    },
   
  ];

  const getAdminMenuItems = () => [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: Home
    },
    {
      name: 'Manage Users',
      path: '/admin/users',
      icon: Users
    },
   
  ];

  // Get menu items based on user role
  const menuItems = user?.role === 'superadmin' 
    ? getSuperAdminMenuItems() 
    : getAdminMenuItems();

  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side cookie
      await logoutAPI();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear client-side storage regardless of API success
      removeUser();
      navigate('/login');
    }
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 flex flex-col h-screen w-72 bg-gray-900 text-white`}
      >
        {/* Logo/Brand and Close Button */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <h1 className="text-xl font-bold flex-1 text-center">Forex Tracker</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white transition-colors absolute right-4"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.full_name?.charAt(0) || user?.username?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium truncate">{user?.full_name || user?.username || 'User'}</p>
            <p className="text-xs text-gray-400 capitalize truncate">
              {user?.role === 'superadmin' ? 'Super Admin' : user?.role || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-3 px-3">
                            {/* || (item.path === '/dashboard' && location.pathname === '/') */}
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
