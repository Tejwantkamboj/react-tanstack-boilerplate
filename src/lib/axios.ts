import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import storage from './storage';

const API_URL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();

  if (config.headers) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
  }

  return config;
};

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || error.message;

    if (status === 401) {
      storage.clearToken();
      window.location.href = '/auth/login';
    }

    toast.dismiss();
    toast.error(message);

    return Promise.reject(error);
  },
);

export default api;
