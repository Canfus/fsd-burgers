import axios from 'axios';

import { ACCESS_TOKEN } from '../constants';
import { getLocalStorageItem } from '../utils';

export const customInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: import.meta.env.PROD,
});

customInstance.interceptors.request.use(
  (request) => {
    const token = getLocalStorageItem<string>(ACCESS_TOKEN);

    if (token) {
      request.headers.Authorization = token;
    }

    return request;
  },
  (error) => Promise.reject(error),
);
