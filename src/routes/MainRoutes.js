import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import ProductLayout from 'layout/ProductLayot';

const HomePage = Loadable(lazy(() => import('pages/Home')));
const CartPage = Loadable(lazy(() => import('pages/Cart')));
const ProductDetailPage = Loadable(lazy(() => import('pages/ProductDetail')));

const MainRoutes = {
    path: '/',
    element: <ProductLayout />,
    children: [
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/cart',
            element: <CartPage />
        },
        {
            path: '/product/:id',
            element: <ProductDetailPage />
        }
    ]
};

export default MainRoutes;
