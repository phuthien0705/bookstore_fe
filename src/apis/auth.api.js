import httpRequest from 'services/httpRequest';

export const login = async (data) => {
    return httpRequest.post('/auth/login', data);
};
