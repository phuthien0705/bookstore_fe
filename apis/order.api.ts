import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async () => {
  return httpRequest.get('/orders');
};
