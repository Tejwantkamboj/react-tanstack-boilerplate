import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public';

export const AppRoutes: React.FC = () => {
  const routes = useRoutes(publicRoutes);
  return routes;
};
