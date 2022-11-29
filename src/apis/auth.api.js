import httpRequest from 'services/httpRequest';

export const login = async (data) => {
    return httpRequest.post('/auth/login', data);
};
export const register = async (data) => {
    return httpRequest.post('/auth/register', data);
};
export const forgotPassword = async (data) => {
    return httpRequest.post('/auth/forgot-password', data);
};
export const verifyEmail = async (param) => {
    return httpRequest.get('/email/verify' + param);
};
export const reSendVerifyEmail = async (data) => {
    return httpRequest.post('/email/verification-notification', data);
};
export const resetPassword = async (params, data) => {
    return httpRequest.post(`/auth/reset-password${params}`, data);
};
export const changePassword = async (params, data) => {
    return httpRequest.put(`/user/password${params}`, data);
};
