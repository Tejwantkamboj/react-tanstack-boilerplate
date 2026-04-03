import { lazyImport } from '../../../lib/lazyImport';
const AdminDashboard = lazyImport(() => import('../routes/dashboard'), 'AdminDashboard');
const UserList = lazyImport(() => import('../routes/user/UserList'), 'UserList');
const UserDetails = lazyImport(() => import('../routes/user/UserDetails'), 'UserDetails');
const AddUser = lazyImport(() => import('../routes/user/AddUser'), 'AddUser');
const EditUser = lazyImport(() => import('../routes/user/EditUser'), 'EditUser');

export const AdminRoutes: { path: string; element: React.ReactNode }[] = [
  {
    path: '',
    element: <AdminDashboard />,
  },
  {
    path: 'user-list',
    element: <UserList />,
  },
  {
    path: 'user-details',
    element: <UserDetails />,
  },
  {
    path: 'add-user',
    element: <AddUser />,
  },
  {
    path: 'edit-user',
    element: <EditUser />,
  },
];
