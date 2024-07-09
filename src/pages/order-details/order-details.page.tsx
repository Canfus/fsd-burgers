import classNames from 'classnames';
import { useLayoutEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
  selectOrderList,
  orderListActions,
} from '@shared/store';
import { useGetIngredientListQuery, useGetOrderQuery } from '@shared/api';
import type { OrderParams } from '@shared/router';
import { isNil, isArrayEmpty } from '@shared/utils';
import { orderStatusConfig } from '@shared/constants';
import { CurrencyIcon } from '@shared/icons';
import { FormattedDate, Link } from '@shared/ui';

import styles from './order-details.module.css';

const OrderDetailsPage: FC = () => {
  const { orderId } = useParams() as unknown as OrderParams;

  const dispatch = useAppDispatch();
  const { set, clear } = orderListActions;

  const { data: ordersData } = useGetOrderQuery(orderId || '');

  useLayoutEffect(() => {
    if (ordersData && ordersData.success) {
      const { orders } = ordersData;

      dispatch(set(orders));
    }

    return () => {
      dispatch(clear());
    };
  }, [dispatch, ordersData, set, clear]);

  const { data } = useGetIngredientListQuery();

  const ingredients = data.data;
  const orders = useAppSelector(selectOrderList);
  const selectedOrder = orders.find(
    (order) => String(order.number) === orderId,
  );

  if (isNil(selectedOrder)) {
    return null;
  }

  const totalPrice = selectedOrder.ingredients.reduce((acc, item) => {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === item,
    );

    if (isNil(foundIngredient)) {
      return acc;
    }

    return foundIngredient.type === 'bun'
      ? acc + foundIngredient.price * 2
      : acc + foundIngredient.price;
  }, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to=".." relative="path" className="text text_type_main-default">
          Вернуться назад
        </Link>
        <p className="text text_type_digits-default">#{selectedOrder.number}</p>
      </div>
      <p className="text text_type_main-default mb-3">{selectedOrder.name}</p>
      <p className="text text_type_main-small mb-15">
        {orderStatusConfig[selectedOrder.status]}
      </p>
      <p className="text text_type_main-default mb-6">Состав:</p>
      <ul className={styles.container__scroll}>
        {selectedOrder.ingredients.map((ingredientId) => {
          const foundIngredients = ingredients.filter(
            (item) => item._id === ingredientId,
          );

          if (isArrayEmpty(foundIngredients)) {
            return null;
          }

          const ingredient = foundIngredients[0];

          const count =
            ingredient.type === 'bun'
              ? foundIngredients.length + 1
              : foundIngredients.length;

          return (
            <li key={ingredient._id} className={styles.ingredient}>
              <div className={styles.ingredient__icon_wrapper}>
                <img
                  src={ingredient.image_mobile}
                  alt="Ingredient"
                  className={styles.ingredient__icon}
                />
              </div>
              <p className="text text_type_main-default">{ingredient.name}</p>
              <p
                className={classNames(
                  styles.ingredient__price,
                  'text',
                  'text_type_digits-default',
                  'pr-2',
                )}
              >
                {`${count} x ${ingredient.price}`}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          );
        })}
      </ul>
      <div className={styles.footer}>
        <FormattedDate
          date={new Date(selectedOrder.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <p
          className={classNames(
            styles.ingredient__price,
            'text',
            'text_type_digits-default',
            'pr-2',
          )}
        >
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
