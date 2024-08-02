import classNames from 'classnames';

import notFoundImage from '@app/assets/icons/not_found.svg';

import type { NotFoundProps } from './not-found.interface';
import styles from './not-found.module.css';

export const NotFound = ({ className, ...props }: NotFoundProps) => (
  <div {...props} className={classNames(styles.wrapper, className)}>
    <img src={notFoundImage} alt="Not found" className={styles.image} />
    <span
      className={classNames('text', 'text_type_digits-large', styles.digit)}
    >
      4
    </span>
    <span
      className={classNames(
        'text',
        'text_type_digits-large',
        styles.digit,
        styles['digit--float'],
      )}
    >
      0
    </span>
    <span
      className={classNames('text', 'text_type_digits-large', styles.digit)}
    >
      4
    </span>
  </div>
);

