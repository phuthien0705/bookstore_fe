import httpRequest from '../services/httpRequest';

export const getAllPublisher = async () => {
  return httpRequest.get('/admin/publishers?per_page=999');
};
export const getAllPublisherClient = async () => {
  return httpRequest.get('/publishers');
};
export const editPublisher = async (
  id: string | number | undefined,
  data: { [key: string]: any }
) => {
  return httpRequest.put(`/admin/publishers/${id}`, data);
};
export const deletePublisher = async (id: string | number | undefined) => {
  return httpRequest.delete(`/admin/publishers/${id}`);
};
export const createPublisher = async (data: { [key: string]: any }) => {
  return httpRequest.post('/admin/publishers', data);
};
