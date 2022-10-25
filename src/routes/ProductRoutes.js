import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import ProductLayout from 'layout/ProductLayot';

const SamplePage = Loadable(lazy(() => import('pages/SamplePage')));
const ProductPage = Loadable(lazy(() => import('pages/Product')));

const ProductRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/product',
            element: <ProductPage />
        },

        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default ProductRoutes;
