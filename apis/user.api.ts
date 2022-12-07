import httpRequest from '@/services/httpRequest';

export const getUserProfile = async () => {
  return httpRequest.get('/user/profile');
};
export const updateProfile = async (data: any) => {
  return httpRequest.post('/user/profile', data);
};
export const updatePassword = async (data: any) => {
  return httpRequest.put('/user/password', data);
};
