import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AuthLayout from 'layout/AuthLayout';

// import pages

const LoginPage = Loadable(lazy(() => import('pages/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/Register')));

const AuthenticationRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            element: <LoginPage />
        },
        {
            path: 'register',
            element: <RegisterPage />
        }
    ]
};

export default AuthenticationRoutes;
