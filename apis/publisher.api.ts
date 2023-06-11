import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachPublisherData } from '@/interfaces/publisher.interface';

export const getAllPublisher = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get<IPaginationResponse<IEachPublisherData>>(
    `/publishers?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllPublisherClient = async () => {
  return httpRequest.get<IPaginationResponse<IEachPublisherData>>(
    '/publishers?limit=20&page=1&sortBy=id'
  );
};
export const editPublisher = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/publishers/${id}`, data);
};
export const deletePublisher = async (id: string | number | undefined) => {
  return httpRequest.delete(`/publishers/${id}`);
};
export const createPublisher = async (data: { [key: string]: any }) => {
  return httpRequest.post('/publishers', data);
};
