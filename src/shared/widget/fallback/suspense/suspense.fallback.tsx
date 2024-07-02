import { Loader } from '../../../ui';

import styles from './suspense.module.css';

export const SuspenseFallback = () => (
  <div className={styles.fallback}>
    <Loader />
  </div>
);
