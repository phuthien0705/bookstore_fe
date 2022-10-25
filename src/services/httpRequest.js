import { axiosInstance } from './initRequest';

class HttpRequest {
    api;

    constructor() {
        this.api = axiosInstance;
    }

    async get(url, config = null) {
        return this.api.get(url, config);
    }

    async post(url, data, config = null) {
        return this.api.post(url, data, config);
    }

    async put(url, data, config = null) {
        return this.api.put(url, data, config);
    }

    async patch(url, data, config = null) {
        return this.api.patch(url, data, config);
    }

    async delete(url, config = null) {
        return this.api.delete(url, config);
    }
}

const httpRequest = new HttpRequest();

export default httpRequest;
