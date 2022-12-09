import httpRequest from '@/services/httpRequest';

export const checkoutProduct = async () => {
  return httpRequest.post(`/checkout/payment/confirm`, null);
};
