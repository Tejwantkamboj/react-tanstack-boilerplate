import { lazyImport } from '../../../lib/lazyImport';
import type { RouteObject } from 'react-router-dom';

const AdminDashboard = lazyImport(() => import('../routes/dashboard'), 'AdminDashboard');

const UserList = lazyImport(() => import('../routes/user/UserList'), 'UserList');
const UserDetails = lazyImport(() => import('../routes/user/UserDetails'), 'UserDetails');
const AddUser = lazyImport(() => import('../routes/user/AddUser'), 'AddUser');
const EditUser = lazyImport(() => import('../routes/user/EditUser'), 'EditUser');

const ContentPageList = lazyImport(() => import('../routes/contentmanagement/ContentPageList'), 'ContentPageList');
const AddContentPage = lazyImport(() => import('../routes/contentmanagement/AddContentPage'), 'AddContentPage');
const EditContentPage = lazyImport(() => import('../routes/contentmanagement/EditContentPage'), 'EditContentPage');
const ContentPageDetails = lazyImport(() => import('../routes/contentmanagement/ContentPageDetails'), 'ContentPageDetails');


export const AdminRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: 'user-list',
    element: <UserList />,
  },
  {
    path: 'user-details/:id',
    element: <UserDetails />,
  },
  {
    path: 'add-user',
    element: <AddUser />,
  },
  {
    path: 'edit-user/:id',
    element: <EditUser />,
  },
  {
    path: 'content-page',
    element: <ContentPageList />,
  },
  {
    path: 'content-page/edit/:id',
    element: <EditContentPage />,
  },
  {
    path: 'content-page/add',
    element: <AddContentPage />,
  },
  {
    path: 'content-page/:id',
    element: <ContentPageDetails />,
  },
];
