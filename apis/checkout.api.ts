import httpRequest from '@/services/httpRequest';
import { EProcessPayment } from '@/constants/processPayment';

export const makeOrder = async ({
  type = EProcessPayment.CASH_ON_DELIVERY,
}: {
  type: EProcessPayment;
}) => {
  return httpRequest.post(`/orders/payment`, { type });
};
