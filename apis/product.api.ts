import httpRequest from '../services/httpRequest';

export const getAllBook = async () => {
  return httpRequest.get(`/admin/books?per_page=999`);
};
export const getAllBookClient = async () => {
  return httpRequest.get('/books?per_page=999');
};

export const getBookDetailById = async (
  id: string | number | null | undefined
) => {
  return httpRequest.get(`books/${id}`);
};
export const editBook = async (
  id: string | number | undefined,
  data: FormData | any
) => {
  return httpRequest.post(`/admin/books/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
export const deleteBook = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/books/${id}`);
};
export const createBook = async (data: FormData | any) => {
  return httpRequest.post('/admin/books', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};
