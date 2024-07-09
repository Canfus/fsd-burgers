import classNames from 'classnames';
import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  useAppSelector,
  useAppDispatch,
  socketActions,
  selectOrderList,
  selectDoneOrders,
  selectPendingOrders,
  selectTotalOrders,
} from '@shared/store';
import { OrderComponent } from '@shared/widget';
import { Loader } from '@shared/ui';
import { isArrayEmpty } from '@shared/utils';

import styles from './feed.module.css';

const FeedPage = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const { wsStartConnecting, wsDisconnecting } = socketActions;

    dispatch(wsStartConnecting('orders/all'));

    return () => {
      dispatch(wsDisconnecting());
    };
  }, [dispatch]);

  const orders = useAppSelector(selectOrderList);
  const doneOrders = useAppSelector(selectDoneOrders);
  const pendingOrders = useAppSelector(selectPendingOrders);
  const [total, totalToday] = useAppSelector(selectTotalOrders);

  if (isArrayEmpty(orders)) {
    return (
      <div className={classNames(styles.page, styles.loader)}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h2
        className={classNames(
          styles.page_title,
          'text',
          'text_type_main-large',
        )}
      >
        Лента заказов
      </h2>
      <ul className={styles.container__scroll}>
        {orders.map((order) => (
          <li key={order._id} className={styles.order}>
            {/* TODO: fix this to routerGetUrls */}
            <Link to={`/feed/${order.number}`}>
              <OrderComponent order={order} />
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.orders__details}>
        <div>
          <p className="text text_type_main-default">Готовы:</p>
          <ul className={styles.numbers__list}>
            {doneOrders.map((order) => (
              <li
                key={order._id}
                className={classNames(
                  styles['order--done'],
                  'text',
                  'text_type_digits-default',
                )}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-default">В работе:</p>
          <ul className={styles.numbers__list}>
            {pendingOrders.map((order) => (
              <li key={order._id} className="text text_type_digits-default">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.orders__total}>
          <p className="text text_type_main-default">Выполнено за все время:</p>
          <p className="text text_type_digits-large">{total || 0}</p>
        </div>
        <div className={styles.orders__total}>
          <p className="text text_type_main-default">Выполнено за сегодня:</p>
          <p className="text text_type_digits-large">{totalToday || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
