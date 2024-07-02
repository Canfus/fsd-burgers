import classNames from 'classnames';

import styles from './loader.module.css';

export const Loader = () => (
  <div className={styles.astronaut}>
    <div className={styles.head} />
    <div className={classNames(styles.arm, styles['arm-left'])} />
    <div className={classNames(styles.arm, styles['arm-right'])} />
    <div className={styles.body}>
      <div className={styles.panel} />
    </div>
    <div className={classNames(styles.leg, styles['leg-left'])} />
    <div className={classNames(styles.leg, styles['leg-right'])} />
    <div className={styles.schoolbag} />
  </div>
);
