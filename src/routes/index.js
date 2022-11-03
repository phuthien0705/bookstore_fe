import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import AdminRoute from './AdminRoute';

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AdminRoute, AuthenticationRoutes]);
}
