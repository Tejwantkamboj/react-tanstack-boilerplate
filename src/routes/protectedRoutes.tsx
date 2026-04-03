import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { lazyImport } from '../lib/lazyImport';
import { AdminRoutes } from '../features/admin/routes';
import { userRoutes } from '../features/user/routes';

const UserLayout = lazyImport(() => import('../components/layouts/user/UserLayout'), 'UserLayout');
const AdminLayout = lazyImport(() => import('../components/layouts/admin/AdminLayout'), 'AdminLayout');

export const getProtectedRoutes = (role?: string): RouteObject[] => {
  if (role === 'admin') {
    return [{ path: '/admin', element: <AdminLayout />, children: AdminRoutes }];
  }

  if (role === 'user') {
    return [{ path: '/user', element: <UserLayout />, children: userRoutes }];
  }

  return [{ path: '*', element: <Navigate to="/" replace /> }];
};
