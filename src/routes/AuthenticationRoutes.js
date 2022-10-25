import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// import pages

const LoginPage = Loadable(lazy(() => import('pages/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/Register')));

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        }
    ]
};

export default AuthenticationRoutes;
