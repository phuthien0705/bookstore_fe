import httpRequest from 'services/httpRequest';

export const getAllPublisher = async () => {
    return httpRequest.get('/admin/publishers');
};
export const editPublisher = async (id, data) => {
    return httpRequest.put(`/admin/publishers/${id}`, data);
};
export const deletePublisher = async (id) => {
    return httpRequest.delete(`/admin/publishers/${id}`);
};
export const createPublisher = async (data) => {
    return httpRequest.post('/admin/publishers', data);
};
