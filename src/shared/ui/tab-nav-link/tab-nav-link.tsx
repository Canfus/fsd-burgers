import classNames from 'classnames';
import { Link, useMatch } from 'react-router-dom';

import type { TabNavLinkProps } from './tab-nav-link.interface';
import styles from './tab-nav-link.module.css';

export const TabNavLink = ({ className, to, ...props }: TabNavLinkProps) => {
  const isActive = useMatch(to.toString());

  return (
    <Link
      {...props}
      to={to}
      className={classNames(
        styles.tab_navlink,
        'text',
        'text_type_main-medium',
        {
          [styles['tab_navlink--active']]: isActive,
        },
        className,
      )}
    />
  );
};

