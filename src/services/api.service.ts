import axios, { AxiosRequestConfig } from 'axios';

// had a bit of help from a friend


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token');
    // const token = store.getState().session.token;
    config.headers.Authorization = token;

    return config;
});


class ApiService {
    private rootUrl = 'http://localhost:3001';

    async get<T = any, K = any>(partialUrl: string, config?: AxiosRequestConfig) {
        return await axios.get<T, K>(`${this.rootUrl}/${partialUrl}`, config);
    }

    async delete<T = any, K = any>(partialUrl: string, config?: AxiosRequestConfig) {
        return await axios.delete<T, K>(`${this.rootUrl}/${partialUrl}`, config);
    }

    async post<T = any, K = any>(partialUrl: string, data?: any, config?: AxiosRequestConfig) {
        return await axios.post<T, K>(`${this.rootUrl}/${partialUrl}`, data, config);
    }

    async put<T = any, K = any>(partialUrl: string, data?: any, config?: AxiosRequestConfig) {
        return await axios.put<T, K>(`${this.rootUrl}/${partialUrl}`, data, config);
    }
}

export default new ApiService();