import { EProcessPayment } from '@/constants/processPayment';
import httpRequest from '../services/httpRequest';

export const getOrderOfClient = async (page: number, limit = 10) => {
  return httpRequest.get(`/orders?limit=${limit}&page=${page}`);
};

export const postProcessOrder = ({
  type = EProcessPayment.CASH_ON_DELIVERY,
}: {
  type: EProcessPayment;
}) => {
  return httpRequest.post(`/orders/payment`, { type });
};
// admin route
export const getAllUserOrder = async (page: number, limit = 10) => {
  return httpRequest.get(`/orders/all?limit=${limit}&page=${page}`);
};

export const getOrderDetail = async (orderId: string | string[] | undefined ) => {
  return httpRequest.get(`/orders/${orderId}`);
};
// export const getOrderDetail = ({ queryKey }: QueryFunctionContext) => {
//   return httpRequest.get<IEachPostData>(`/posts/${queryKey[1]}`);
// };

export const editOrderStatus = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/genres/${id}`, data);
};
