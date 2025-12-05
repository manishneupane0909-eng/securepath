import axios from 'axios';

const AUTH_TOKEN = 'root';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;