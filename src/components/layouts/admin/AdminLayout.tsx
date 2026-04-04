import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../../Elements';
import Header from './Header';
import SideBar from './SideBar';

export const AdminLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-90-vh w-100 d-flex align-items-center justify-content-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <div className="flex my-6 mx-8">
        <div className="flex">
          <SideBar />
          <Header />
        </div>
        <Outlet />
      </div>
    </Suspense>
  );
};
