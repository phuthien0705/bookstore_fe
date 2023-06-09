import { EProcessPayment } from '@/constants/processPayment';
import httpRequest from '../services/httpRequest';
import { EOrderStatus } from '@/interfaces/compontents/order.interface';

export const getOrderOfClient = async (page: number, limit = 10) => {
  return httpRequest.get(`/orders?limit=${limit}&page=${page}&sortBy=createdAt:desc`);
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
  return httpRequest.get(`/orders/all?limit=${limit}&page=${page}&sortBy=createdAt:desc`);
};

export const getOrderDetail = async (orderId: string | string[] | undefined ) => {
  return httpRequest.get(`/orders/${orderId}`);
};

export const editOrderStatus = async (
  orderId: string | number | undefined,
  data: { [key: string]: EOrderStatus | undefined }
) => {
  return httpRequest.put(`/orders/${orderId}`, data);
};