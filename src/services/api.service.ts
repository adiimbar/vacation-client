import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

class ApiService {
    private rootUrl = 'http://localhost:3001';

    async get<T = any, K = any>(partialUrl: string, config?: AxiosRequestConfig) {
        return await axios.get<T, K>(`${this.rootUrl}/${partialUrl}`, config);
    }

    async post<T = any, K = any>(partialUrl: string, data?: any, config?: AxiosRequestConfig) {
        return await axios.post<T, K>(`${this.rootUrl}/${partialUrl}`, data, config);
    }
}

export default new ApiService();