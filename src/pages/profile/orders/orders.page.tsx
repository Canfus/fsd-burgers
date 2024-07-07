import { useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  socketActions,
  selectOrderList,
} from '@shared/store';
import { getLocalStorageItem, isArrayEmpty } from '@shared/utils';
import { ACCESS_TOKEN } from '@shared/constants';
import { Order } from '@shared/widget';
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
            <Order key={order._id} order={order} status className={styles.order} />
          ))}
        </ul>

      )}
    </div>
  );
};

export default ProfileOrdersPage;

