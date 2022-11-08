import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AdminLayout from 'layout/AdminLayout';

const ProductManagementPage = Loadable(lazy(() => import('pages/ProductManagement')));
const UserManagementPage = Loadable(lazy(() => import('pages/UserManagement')));
const PublisherManagementPage = Loadable(lazy(() => import('pages/PublisherManagement')));
const GenreManagementPage = Loadable(lazy(() => import('pages/GenreManagement')));
const AuthorManagementPage = Loadable(lazy(() => import('pages/AuthorManagement')));
const DiscountManagementPage = Loadable(lazy(() => import('pages/DiscountManagement')));

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
