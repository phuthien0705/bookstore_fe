import createSearchParams from '@/common/createSearchParams';
import httpRequest from '../services/httpRequest';
import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachBookData } from '@/interfaces/book.interface';

export const getAllBook = async (
  page: number,
  limit = 10,
  searchFields = [],
  value = ''
) => {
  return httpRequest.get<IPaginationResponse<IEachBookData>>(
    `/books?limit=${limit}&page=${page}${createSearchParams(
      searchFields,
      value
    )}`
  );
};
export const getAllBookClient = async () => {
  return httpRequest.get('/books?per_page=100');
};
export const filterBook = async ({
  genres = '',
  price = '',
  sortBy = '',
  page = 1,
  limit
}: any) => {
  let params = '?';
  if (genres != '') {
   params = params + '&genres=' + genres;
  }
  if (price != '') {
    params = params + '&price=' + price;
   }
  if (sortBy != '') {
    if (params) params = params + '&sortBy=' + sortBy;
  }
  return httpRequest.get<IPaginationResponse<IEachBookData>>(`/books${params}&limit=${limit}&page=${page}`);
};
export const getBookDetailById = async (
  id: string | number | null | undefined
) => {
  return httpRequest.get<IEachBookData>(`books/${id}`);
};
export const editBook = async (
  id: string | number | undefined,
  data: FormData | any
) => {
  return httpRequest.put(`/books/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
export const deleteBook = async (id: string | number | undefined) => {
  return httpRequest.delete(`/books/${id}`);
};
export const createBook = async (data: FormData | any) => {
  return httpRequest.post('/books', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export const getTopSelling = async () => {
  return httpRequest.get<IPaginationResponse<IEachBookData>>(
    `/books?limit=5&page=1&sortBy=createdAt`
  );
};

export const getRelateBook = async (genres = '') => {
  if (genres)
    return httpRequest.get<IPaginationResponse<IEachBookData>>(
      `/books?limit=10&page=1&genres=${genres}`
    );
  return httpRequest.get<IPaginationResponse<IEachBookData>>(
    `/books?limit=10&page=1`
  );
};

export const getListBookByGenre = async (genresid: any, slideToShow = 5) => {
  return httpRequest.get<IPaginationResponse<IEachBookData>>(
    `/books?limit=${slideToShow}&page=1&genres=${genresid}`
  );
};
