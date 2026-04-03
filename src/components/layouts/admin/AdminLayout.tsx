import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../../Elements';
import Header from './Header';

export const AdminLayout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-90-vh w-100 d-flex align-items-center justify-content-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <Header />
      <main className="w-100 main-block">
        <div style={{ minHeight: '90vh' }}>
          <Outlet />
        </div>
      </main>
    </Suspense>
  );
};
