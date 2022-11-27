import httpRequest from 'services/httpRequest';

export const getAllDiscount = async () => {
    return httpRequest.get('/admin/discounts');
};
export const editDiscount = async (id, data) => {
    return httpRequest.put(`/admin/discounts/${id}`, data);
};
export const deleteDiscount = async (id) => {
    return httpRequest.delete(`/admin/discounts/${id}`);
};
export const createDiscount = async (data) => {
    return httpRequest.post('/admin/discounts', data);
};
