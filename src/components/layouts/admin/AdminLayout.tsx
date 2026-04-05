import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../../Elements';
import Header from './Header';
import SideBar from './SideBar';

export const AdminLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className="p-6 overflow-auto flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
