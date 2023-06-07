import cookie from 'js-cookie';
import { getCookie } from '@/common/session';

class AuthService {
  login = ({ accessToken, name, roles, id, email, refreshToken }: any) => {
    cookie.set('accessToken', `${accessToken}`, { expires: 7 });
    cookie.set('refreshToken', `${refreshToken}`, { expires: 7 });
    const userPayload = { name, roles, id, email };
    const userStringify = JSON.stringify(userPayload);
    localStorage.setItem('user', userStringify);
  };

  logOut = () => {
    cookie.remove('accessToken');
    localStorage.clear();
  };

  getUser = () => {
    let user = localStorage.getItem('user') || '';
    if (user) {
      user = JSON.parse(user);
    }
    return user;
  };

  getAccessToken = () => getCookie('accessToken') || '';

  isAuthenticated = () => !!this.getAccessToken() && !!this.getUser();

  isAdmin = () => {
    const user: any = this.getUser();
    if (user?.roles?.includes('admin')) return true;
    return false;
  };

  isManger = () => {
    const user: any = this.getUser();
    if (user?.roles?.includes('manager')) return true;
    return false;
  };
}

const authService = new AuthService();

export default authService;
