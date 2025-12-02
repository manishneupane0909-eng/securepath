// src/api.js
import axios from 'axios';

// Define the token outside (or import it from a config file if needed)
const AUTH_TOKEN = 'root';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// CRITICAL FIX: Add a request interceptor to attach the Bearer token automatically
api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;