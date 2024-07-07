import classNames from 'classnames';
import { FC } from 'react';

import { useGetIngredientListQuery } from '@shared/api';
import { FormattedDate } from '@shared/ui';
import { isNil } from '@shared/utils';
import { CurrencyIcon } from '@shared/icons';

import { orderStatusConfig } from '../../constants';
import type { OrderProps } from './order.interface';
import styles from './order.module.css';

export const Order: FC<OrderProps> = ({
  order,
  className,
  status,
  ...props
}) => {
  const { data: ingredients } = useGetIngredientListQuery();

  const totalPrice = order.ingredients.reduce((acc, id) => {
    const foundIngredient = ingredients.data.find(
      (ingredient) => ingredient._id === id,
    );

    if (foundIngredient) {
      return acc + foundIngredient.price;
    }

    return acc;
  }, 0);

  return (
    <div {...props} className={classNames(styles.order, 'p-6', className)}>
      <p className={classNames(styles.order__title, 'mb-6')}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
      </p>
      <p className="text text_type_main-medium mb-2">{order.name}</p>
      {status && (
        <p className="text text_type_main-default">
          {orderStatusConfig[order.status]}
        </p>
      )}
      <div className={classNames(styles.order__ingredients, 'mt-6')}>
        <section className={styles.ingredients__list}>
          {order.ingredients.slice(0, 6).map((ingredientId, index) => {
            const ingredient = ingredients.data.find(
              (item) => item._id === ingredientId,
            );

            if (isNil(ingredient)) {
              return null;
            }

            return (
              <div
                className={styles.ingredient__wrapper}
                style={{ left: -(20 * index), zIndex: 6 - index }}
              >
                <img
                  src={ingredient.image_mobile}
                  alt="Ingredient"
                  className={styles.ingredient}
                />
                {order.ingredients.length > 6 && index === 5 && (
                  <p
                    className={classNames(
                      styles.text,
                      'text',
                      'text_type_digits-default',
                    )}
                  >{`+${order.ingredients.length - 6}`}</p>
                )}
              </div>
            );
          })}
        </section>
        <p
          className={classNames(
            styles.ingredient__price,
            'text',
            'text_type_digits-default',
          )}
        >
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

