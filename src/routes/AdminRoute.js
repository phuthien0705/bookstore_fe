import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AdminLayout from 'layout/AdminLayout';

const ProductManagementPage = Loadable(lazy(() => import('pages/admin/ProductManagement')));
const UserManagementPage = Loadable(lazy(() => import('pages/admin/UserManagement')));
const PublisherManagementPage = Loadable(lazy(() => import('pages/admin/PublisherManagement')));
const GenreManagementPage = Loadable(lazy(() => import('pages/admin/GenreManagement')));
const AuthorManagementPage = Loadable(lazy(() => import('pages/admin/AuthorManagement')));
const DiscountManagementPage = Loadable(lazy(() => import('pages/admin/DiscountManagement')));

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
        },
        { path: 'admin/publisher', element: <PublisherManagementPage /> },
        {
            path: 'admin/genre',
            element: <GenreManagementPage />
        },
        {
            path: 'admin/author',
            element: <AuthorManagementPage />
        },
        {
            path: 'admin/discount',
            element: <DiscountManagementPage />
        }
    ]
};

export default AdminRoute;
