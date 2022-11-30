import httpRequest from '@/services/httpRequest';

export const login = async (data: any) => {
  return httpRequest.post('/auth/login', data);
};
export const register = async (data: any) => {
  return httpRequest.post('/auth/register', data);
};
export const forgotPassword = async (data: any) => {
  return httpRequest.post('/auth/forgot-password', data);
};
export const verifyEmail = async (param: any) => {
  return httpRequest.get('/email/verify' + param);
};
export const reSendVerifyEmail = async (data: any) => {
  return httpRequest.post('/email/verification-notification', data);
};
export const resetPassword = async (params: any, data: any) => {
  return httpRequest.post(`/auth/reset-password${params}`, data);
};
