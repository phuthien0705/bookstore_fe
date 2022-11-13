import httpRequest from 'services/httpRequest';

export const getAllBook = async () => {
    return httpRequest.get('/admin/books');
};
export const editBook = async (id, data) => {
    return httpRequest.put(`/admin/books/${id}`, data);
};
export const deleteBook = async (id) => {
    return httpRequest.delete(`/admin/books/${id}`);
};
export const createBook = async (data) => {
    return httpRequest.post('/admin/books', data);
};
