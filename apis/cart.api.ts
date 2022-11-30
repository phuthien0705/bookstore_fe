import httpRequest from '@/services/httpRequest';

export const getCartItemsById = async (id: string | number | undefined) => {
  return httpRequest.get('/admin/cart/' + id);
};
