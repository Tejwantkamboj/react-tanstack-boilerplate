import type { RouteObject } from 'react-router-dom';
import { AuthRoutes } from '../features/auth/routes';
import { CommonRoutes } from '../features/common/routes';
import { lazyImport } from '../lib/lazyImport';

const PublicLayout = lazyImport(() => import('../components/layouts/public/PublicLayout'), 'PublicLayout');
const AuthLayout = lazyImport(() => import('../components/layouts/auth/AuthLayout'), 'AuthLayout');

export const publicRoutes: RouteObject[] = [
  { path: '/', element: <PublicLayout />, children: CommonRoutes },
  { path: '/auth', element: <AuthLayout />, children: AuthRoutes },
];
