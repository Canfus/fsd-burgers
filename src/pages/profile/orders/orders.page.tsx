import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
  socketActions,
  selectOrderList,
} from '@shared/store';
import { getLocalStorageItem, isArrayEmpty } from '@shared/utils';
import { ACCESS_TOKEN } from '@shared/constants';
import { OrderComponent } from '@shared/widget';
import { Loader } from '@shared/ui';

import styles from './orders.module.css';

const ProfileOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { wsStartConnecting, wsDisconnecting } = socketActions;

  const orders = useAppSelector(selectOrderList);

  useEffect(() => {
    const token = getLocalStorageItem<string>(ACCESS_TOKEN);

    dispatch(wsStartConnecting(`orders?token=${token?.split(' ')[1]}`));

    return () => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch, wsDisconnecting, wsStartConnecting]);

  return (
    <div className={styles.page}>
      {isArrayEmpty(orders) ? (
        <Loader />
      ) : (
        <ul className={styles.container__scroll}>
          {orders.map((order) => (
            <li key={order._id} className={styles.order}>
              <Link to={String(order.number)} className={styles.order__link}>
                <OrderComponent order={order} status />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfileOrdersPage;
