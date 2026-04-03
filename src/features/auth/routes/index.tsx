import type { RouteObject } from 'react-router-dom';
import { lazyImport } from '../../../lib/lazyImport';

const Login = lazyImport(() => import('./Login'), 'Login');
const Register = lazyImport(() => import('./Register'), 'Register');
const VerifyOtp = lazyImport(() => import('./VerifyOtp'), 'VerifyOtp');
const ResetPassword = lazyImport(() => import('./ResetPassword'), 'ResetPassword');
const ForgotPassword = lazyImport(() => import('./ForgotPassword'), 'ForgotPassword');

export const AuthRoutes: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'forgot',
    element: <ForgotPassword />,
  },
  {
    path: 'verify-otp',
    element: <VerifyOtp />,
  },
  {
    path: 'reset',
    element: <ResetPassword />,
  },
];
