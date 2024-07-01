import { Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { TabNavLink } from '@shared/ui';
import { routerGetUrls } from '@shared/router';
import { useLogoutMutation } from '@shared/api';
import { useAppDispatch, resetStoreAction } from '@shared/store';
import { getLocalStorageItem } from '@shared/utils';
import { REFRESH_TOKEN } from '@shared/constants';

import styles from './layout.module.css';

const ProfileLayout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: logout } = useLogoutMutation({
    onSettled: () => {
      queryClient.clear();

      dispatch(resetStoreAction());
    },
  });

  const onLogoutClick = () => {
    const token = getLocalStorageItem<string>(REFRESH_TOKEN);

    logout({ token: token! });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.layout__wrapper}>
        <section className={styles.layout__navigation}>
          <TabNavLink to={routerGetUrls.getProfilePage()}>Профиль</TabNavLink>
          <TabNavLink to={routerGetUrls.getProfileOrdersPage()}>
            История заказов
          </TabNavLink>
          <TabNavLink to={routerGetUrls.getHomePage()} onClick={onLogoutClick}>
            Выход
          </TabNavLink>
          <p className="text text_type_main-small text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </section>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;

