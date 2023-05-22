import { QueryFunctionContext } from 'react-query';
import httpRequest from '@/services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachPostData } from '@/interfaces/post.interface';

/** Querykey format: [key, currentPage, limit] */
export const getListPost = ({ queryKey }: QueryFunctionContext) => {
  return httpRequest.get<IPaginationResponse<IEachPostData>>(
    `/posts?page=${queryKey[1]}&limit=${queryKey[2]}`
  );
};
