import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import SuperAdminDashboard from '../Features/SuperAdminDashboard';
import AdminDashboard from '../Features/AdminDashboard';
import ManageSuperAdmin from '../Features/ManageSuperAdmin';
import Layout from '../components/Layout';
import RoleBasedRedirect from '../components/RoleBasedRedirect';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const Routes = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RoleBasedRedirect />
      },
      {
        path: 'dashboard',
        element: <RoleBasedRedirect />
      },
      // SuperAdmin Routes
      {
        path: 'superadmin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'superadmin/admins',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <ManageSuperAdmin />
          </ProtectedRoute>
        )
      },
      // Admin Routes
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Manage Users</h1>
            </div>
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/trades',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <div className="p-8">
              <h1 className="text-2xl font-bold">Trades Page</h1>
            </div>
          </ProtectedRoute>
        )
      },

      
     
    ]
  },
  {
    path: '*',
    element: <RoleBasedRedirect />
  }
];

export default Routes;
