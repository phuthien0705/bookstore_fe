import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import ProductRoutes from './ProductRoutes';

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, ProductRoutes, AuthenticationRoutes]);
}
