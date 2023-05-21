import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async (page: number, limit = 10) => {
  return httpRequest.get(`/orders?limit=${limit}&page=${page}`);
};
