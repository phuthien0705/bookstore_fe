import { lazy } from 'react';
import Loadable from 'components/Loadable';
import AuthLayout from 'layout/AuthLayout';

const LoginPage = Loadable(lazy(() => import('pages/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/Register')));
const ForgotPasswordPage = Loadable(lazy(() => import('pages/ForgotPassword')));
const ResetPasswordPage = Loadable(lazy(() => import('pages/ResetPassword')));
const VerifyPasswordPage = Loadable(lazy(() => import('pages/VerifyPassword')));

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
        },
        {
            path: 'forgot-password',
            element: <ForgotPasswordPage />
        },
        {
            path: 'reset-password',
            element: <ResetPasswordPage />
        },
        {
            path: 'email/verify/:uid/:hash',
            element: <VerifyPasswordPage />
        }
    ]
};

export default AuthenticationRoutes;
