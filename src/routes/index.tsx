import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';
import { getProtectedRoutes } from './protectedRoutes';
import { useUser } from '../lib/auth';
import storage from '../lib/storage';
import { Spinner } from '../components/Elements';

export const AppRoutes: React.FC = () => {
  const { data: user, isLoading } = useUser();
  const token = storage.getToken();
  
  if (isLoading) {
    return <Spinner />;
  }

  // console.log('User:', user);
  // console.log('token', token);
  const publicRouteElements = token && user ? getProtectedRoutes(user?.role) : publicRoutes;
  const routes = useRoutes([...publicRouteElements]);

  return <Suspense fallback={<Spinner />}>{routes}</Suspense>;
};
