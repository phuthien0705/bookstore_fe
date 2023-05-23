import createSearchParams from '@/common/createSearchParams';
import httpRequest from '@/services/httpRequest';

export const getUserProfile = async () => {
  return httpRequest.get('/profile');
};
export const updateProfile = async (data: any) => {
  return httpRequest.post('/profile', data);
};
export const updatePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return httpRequest.put('/profile/password', data);
};
export const getUserForAdmin = async (
  current_page: number,
  per_page = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get(
    `/admin/users?per_page=${per_page}&page=${current_page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const activeUser = async (data: any) => {
  return httpRequest.put('/admin/users/active', data);
};
export const unactiveUser = async (data: any) => {
  return httpRequest.put('/admin/users/unactive', data);
};
export const assignRole = async (data: any) => {
  return httpRequest.post('/admin/users/assign-role', data);
};
export const removeRole = async (data: any) => {
  return httpRequest.put('/admin/users/remove-role', data);
};
