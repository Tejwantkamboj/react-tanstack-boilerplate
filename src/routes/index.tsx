import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes: React.FC = () => {
  const routes = useRoutes(publicRoutes);
  console.log('routes', routes);
  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};
