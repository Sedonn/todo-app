/** @fileoverview Configuration of the general API service. */

import axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';

export const APIService = axios.create({
  baseURL: API_URL,
});

APIService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
