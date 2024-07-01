import { Outlet, Link } from 'react-router-dom';

import { Logo, NavLink } from '@shared/ui';
import { BurgerIcon, ListIcon, ProfileIcon } from '@shared/icons';
import { routerGetUrls } from '@shared/router';
import { getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN } from 'shared/constants';
import { useGetUserQuery } from '@shared/api';

import styles from './layout.module.css';

const AppLayout = () => {
  const token = getLocalStorageItem<string>(ACCESS_TOKEN);

  const { data } = useGetUserQuery({
    enabled: Boolean(token),
  });

  return (
    <div className={styles.layout}>
      <nav className={styles.navigation}>
        <div className={styles.navigation__wrapper}>
          <section>
            <NavLink
              to={routerGetUrls.getHomePage()}
              renderIcon={({ isActive }) => (
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              )}
            >
              Конструктор
            </NavLink>
            <NavLink
              to={routerGetUrls.getFeedPage()}
              renderIcon={({ isActive }) => (
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
              )}
            >
              Лента заказов
            </NavLink>
          </section>
          <Link
            to={routerGetUrls.getHomePage()}
            className={styles.navigation__logo}
          >
            <Logo />
          </Link>
          <NavLink
            to={routerGetUrls.getProfilePage()}
            renderIcon={({ isActive }) => (
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            )}
          >
            {data ? data.user.name : 'Личный кабинет'}
            {/* TODO: replace to store */}
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default AppLayout;
