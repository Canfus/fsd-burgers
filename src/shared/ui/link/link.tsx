import classNames from 'classnames';
import { Link as LinkPrimitive } from 'react-router-dom';

import type { LinkProps } from './link.interface';
import styles from './link.module.css';

export const Link = ({ className, ...props }: LinkProps) => (
  <LinkPrimitive {...props} className={classNames(styles.link, className)} />
);
