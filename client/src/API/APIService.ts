/** @fileoverview Configuration of the general API service. */

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { userStore } from '@/App';
import { API_URL } from '@/config';

export const APIService = axios.create({
  baseURL: API_URL,
});

APIService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${userStore.token}`;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

APIService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      userStore.logout();
    }

    return Promise.reject(error);
  },
);
