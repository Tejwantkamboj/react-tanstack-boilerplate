import { lazyImport } from '../lib/lazyImport';
const AuthRoutes = lazyImport(() => import('../features/auth/routes'), 'AuthRoutes');
const CommonRoutes = lazyImport(() => import('../features/common/routes'), 'CommonRoutes');

export const publicRoutes = [
  { path: '/*', element: <CommonRoutes /> },
  { path: '/auth/*', element: <AuthRoutes /> },
];
