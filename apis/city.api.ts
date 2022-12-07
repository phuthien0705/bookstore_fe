import httpRequest from '@/services/httpRequest';

export const getListCity = async () => {
  return httpRequest.get('/cities/admin-cities');
};
export const getListDistrict = async (admin_name: number | string) => {
  return httpRequest.get(
    `/cities/admin-cities/cities-list?admin_name=${admin_name}`
  );
};
