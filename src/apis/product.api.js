import httpRequest from 'services/httpRequest';

export const getAllBook = async () => {
    return httpRequest.get('/admin/books');
};
export const getAllBookClient = async () => {
    return httpRequest.get('/books');
};
export const getBookDetailById = async (id) => {
    return httpRequest.get(`books/${id}`);
};
export const editBook = async (id, data) => {
    return httpRequest.put(`/admin/books/${id}`, data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
};
export const deleteBook = async (id) => {
    return httpRequest.delete(`/admin/books/${id}`);
};
export const createBook = async (data) => {
    return httpRequest.post('/admin/books', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
};
