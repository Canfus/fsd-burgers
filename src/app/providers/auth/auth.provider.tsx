import { Navigate, Outlet } from 'react-router-dom';

import { getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN } from '@shared/constants';
import { routerGetUrls } from '@shared/router';

export const AuthProvider = () => {
  const isLoggedIn = getLocalStorageItem<string>(ACCESS_TOKEN);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={routerGetUrls.getLoginPage()} replace />
  );
};
