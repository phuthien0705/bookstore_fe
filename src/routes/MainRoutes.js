import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import ProductLayout from 'layout/ProductLayot';

const HomePage = Loadable(lazy(() => import('pages/Home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <ProductLayout />,
    children: [
        {
            path: '/',
            element: <HomePage />
        }
    ]
};

export default MainRoutes;
