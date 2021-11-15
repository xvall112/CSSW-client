import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import FunctionsSoftware from 'src/pages/FunctionsSoftware';
import UsersList from 'src/pages/UsersList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Account from 'src/pages/Account';
import Licenses from 'src/pages/Licenses';
import LicenseDetail from 'src/pages/LicenseDetail';

export const loginRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'functions', element: <FunctionsSoftware /> },
      {
        path: 'licenses',
        element: <Licenses />
      },
      {
        path: 'licenses/:licenseId',
        element: <LicenseDetail />
      },
      {
        path: 'users',
        element: <UsersList />
      },
      { path: 'account/:userId', element: <Account /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/app/dashboard" /> }
    ]
  }
];
export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="login" /> },
      { path: '*', element: <Navigate to="login" /> }
    ]
  }
];

export const userRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'functions', element: <FunctionsSoftware /> },
      {
        path: 'licenses',
        element: <Licenses />
      },
      {
        path: 'licenses/:licenseId',
        element: <LicenseDetail />
      },
      { path: 'account/:userId', element: <Account /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/app/dashboard" /> }
    ]
  }
];
