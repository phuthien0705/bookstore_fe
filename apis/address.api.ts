import httpRequest from '@/services/httpRequest';

export const getListAddress = async () => {
  return httpRequest.get('/addresses');
};
export const addAddress = async (data: any) => {
  return httpRequest.post('addresses/add-address', data);
};
export const deleteAddress = async (id: number) => {
  return httpRequest.delete(`/addresses/${id}`);
};
export const setDefaultAddress = async (id: number) => {
  return httpRequest.put(`/addresses/${id}`, null);
};
export const getDetailAddress = async (id: number) => {
  return httpRequest.get(`/addresses/${id}`);
};
