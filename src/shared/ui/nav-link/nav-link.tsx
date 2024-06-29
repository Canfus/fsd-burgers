import classNames from 'classnames';
import { NavLink as NavLinkPrimitive } from 'react-router-dom';

import type { NavLinkProps } from './nav-link.interface';
import styles from './nav-link.module.css';

export const NavLink = ({
  renderIcon,
  children,
  className,
  ...props
}: NavLinkProps) => (
  <NavLinkPrimitive
    {...props}
    className={({ isActive }) =>
      classNames(
        styles.navlink,
        {
          [styles['navlink--active']]: isActive,
        },
        'text',
        'text_type_main-default',
        className,
      )
    }
  >
    {({ isActive }) => (
      <>
        {renderIcon({ isActive })}
        {children}
      </>
    )}
  </NavLinkPrimitive>
);
