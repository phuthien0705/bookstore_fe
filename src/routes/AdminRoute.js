import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AdminLayout from 'layout/AdminLayout';

const ProductManagementPage = Loadable(lazy(() => import('pages/ProductManagement')));
const UserManagementPage = Loadable(lazy(() => import('pages/UserManagement')));

const AdminRoute = {
    path: '/',
    element: <AdminLayout />,
    children: [
        {
            path: 'admin',
            element: <ProductManagementPage />
        },
        {
            path: 'admin/product',
            element: <ProductManagementPage />
        },
        {
            path: 'admin/user',
            element: <UserManagementPage />
        }
    ]
};

export default AdminRoute;
