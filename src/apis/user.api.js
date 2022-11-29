import httpRequest from 'services/httpRequest';

export const getProfile = async (id) => {
    return httpRequest.get(`/user/profile${id}`);
};
export const updateProfile = async (id, data) => {
    return httpRequest.post(`/user/profile${id}`, data);
};
