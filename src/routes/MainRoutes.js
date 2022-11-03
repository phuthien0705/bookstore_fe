import { lazy } from 'react';
import Loadable from 'components/Loadable';
import ProductLayout from 'layout/ProductLayot';

const HomePage = Loadable(lazy(() => import('pages/Home')));
const CartPage = Loadable(lazy(() => import('pages/Cart')));
const ProductDetailPage = Loadable(lazy(() => import('pages/ProductDetail')));
const ProductPage = Loadable(lazy(() => import('pages/Product')));
const NotFoundPage = Loadable(lazy(() => import('pages/404')));

const MainRoutes = {
    path: '/',
    element: <ProductLayout />,
    children: [
        {
            path: '',
            element: <HomePage />
        },
        {
            path: 'cart',
            element: <CartPage />
        },
        {
            path: 'product',
            element: <ProductPage />
        },
        {
            path: 'product/:id',
            element: <ProductDetailPage />
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ]
};

export default MainRoutes;
