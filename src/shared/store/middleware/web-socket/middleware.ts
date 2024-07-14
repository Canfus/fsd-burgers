import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

import type { OrderListResponse, RefreshTokenResponse } from '@shared/api';
import { customInstance } from '@shared/api/api.instance';
import { endpoints } from '@shared/api/queries/queries.constants';
import { getLocalStorageItem, setLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@shared/constants';

import { type SocketActions, orderListActions } from '../../slices';
import type { RootState, AppDispatch } from '../../store.interface';

export const createSocketMiddleware =
  (actions: SocketActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;
    let reconnectTimer: number = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const { set, clear, setTotal } = orderListActions;

      if (actions.wsStartConnecting.match(action)) {
        socket = new WebSocket(
          [process.env.VITE_WS_API_URL, action.payload].join('/'),
        );
        isConnected = true;

        window.clearInterval(reconnectTimer);
        reconnectTimer = 0;

        socket.onopen = () => {
          console.log('Произошел коннект');
          dispatch(actions.wsConnecting());
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;

          const parsedData = JSON.parse(data) as OrderListResponse;

          if (!parsedData.success) {
            customInstance
              .post<RefreshTokenResponse>(endpoints.getUpdateToken(), {
                token: getLocalStorageItem<string>(REFRESH_TOKEN),
              })
              .then((response) => {
                const { accessToken, refreshToken } = response.data;

                setLocalStorageItem(ACCESS_TOKEN, accessToken);
                setLocalStorageItem(REFRESH_TOKEN, refreshToken);

                dispatch(
                  actions.wsStartConnecting(
                    [process.env.VITE_WS_API_URL, action.payload].join('/'),
                  ),
                );
              });
          } else {
            dispatch(set(parsedData.orders));
            dispatch(setTotal(parsedData));
          }
        };

        socket.onerror = () => {
          const message =
            'Произошла какая-то ошибка. Что произошло мы не знаем и никогда не узнаем';

          console.error(message);

          dispatch(actions.wsError(message));
        };

        socket.onclose = (event: CloseEvent) => {
          const { code, reason } = event;

          if (code !== 1000) {
            console.error(
              `Соединение закрылось с кодом ${code} и вот почему:\n${reason}`,
            );

            dispatch(actions.wsError(reason));
          }

          if (isConnected) {
            console.log('Кто не падал тот не поднимался, встаем!');

            dispatch(actions.wsConnecting());

            reconnectTimer = window.setInterval(() => {
              dispatch(
                actions.wsStartConnecting(
                  [process.env.VITE_WS_API_URL, action.payload].join('/'),
                ),
              );
            }, 3000);
          }
        };
      }

      if (socket && actions.wsDisconnecting.match(action)) {
        window.clearInterval(reconnectTimer);
        isConnected = false;
        socket.close();

        dispatch(clear());
      }

      return next(action);
    };
  };
