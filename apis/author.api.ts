import httpRequest from '../services/httpRequest';

export const getAllAuthor = async () => {
  return httpRequest.get('/admin/authors');
};
export const getAllAuthorClient = async () => {
  return httpRequest.get('/authors');
};
export const editAuthor = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/admin/authors/${id}`, data);
};
export const deleteAuthor = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/authors/${id}`);
};
export const createAuthor = async (data: { [key: string]: any }) => {
  return httpRequest.post('/admin/authors', data);
};
