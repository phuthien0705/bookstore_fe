import axios from 'axios';
import cookie from 'js-cookie';

function getAccessToken() {
    const accessToken = cookie.get('accessToken') || '';
    return accessToken;
}

const requestConfig = {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000'
};

export const axiosInstance = axios.create(requestConfig);

export default function initRequest() {
    axiosInstance.interceptors.request.use(
        (config) => {
            const accessToken = getAccessToken();
            if (accessToken) {
                // config.headers.Authorization = `Bearer ${accessToken}`;
                config.headers = {
                    Authorization: `Bearer ${accessToken}`
                };
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res.data;
        },
        (error) => {
            switch (error.response?.status) {
                case 401: {
                    alert('Thời gian đăng nhập của bạn đã hết. Vui lòng đăng nhập lại để tiếp tục');
                    break;
                }
                case 400: {
                    break;
                }
                case 500: {
                    break;
                }
                default:
                    break;
            }
            return Promise.reject(error);
        }
    );
}
