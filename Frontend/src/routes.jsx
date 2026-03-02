import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'trades',
        element: (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Trades Page</h1>
          </div>
        )
      },
      {
        path: 'users',
        element: (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Users Page</h1>
          </div>
        )
      },
      {
        path: 'analytics',
        element: (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Analytics Page</h1>
          </div>
        )
      },
      {
        path: 'settings',
        element: (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Settings Page</h1>
          </div>
        )
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
];

export default routes;
