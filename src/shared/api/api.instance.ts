import axios, { AxiosError } from 'axios';

import { RefreshTokenResponse } from '@shared/api/models';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import {
  getLocalStorageItem,
  resetLocalStorage,
  setLocalStorageItem,
} from '../utils';
import { endpoints } from './queries/queries.constants';

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

customInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      const { status } = error.response || {};

      if (status === 403) {
        customInstance
          .post<RefreshTokenResponse>(endpoints.getUpdateToken(), {
            token: getLocalStorageItem<string>(REFRESH_TOKEN),
          })
          .then((response) => {
            const { accessToken, refreshToken } = response.data;

            setLocalStorageItem(ACCESS_TOKEN, accessToken);
            setLocalStorageItem(REFRESH_TOKEN, refreshToken);
          })
          .catch(() => {
            resetLocalStorage();
            window.location.reload();

            return;
          });
      }
    }

    return Promise.reject(error);
  },
);
