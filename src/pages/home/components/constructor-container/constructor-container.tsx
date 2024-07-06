import classNames from 'classnames';
import { useMemo, type FC } from 'react';
import { useDrop } from 'react-dnd';

import { Button } from '@shared/ui';
import { CurrencyIcon } from '@shared/icons';
import {
  useAppDispatch,
  useAppSelector,
  constructorActions,
  selectConstructor,
  orderActions,
} from '@shared/store';
import { isNil, getUID } from '@shared/utils';
import { INGREDIENT_TYPE } from '@shared/constants';
import { Constructor } from '@shared/widget';
import { useCreateOrderMutation, type Ingredient } from '@shared/api';

import type { ConstructorContainerProps } from './constructor-container.interface';
import styles from './constructor-container.module.css';

export const ConstructorContainer: FC<ConstructorContainerProps> = ({
  className,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { append } = constructorActions;
  const { set } = orderActions;

  const [bun, ...constructor] = useAppSelector(selectConstructor);

  const { mutate: createOrder, isPending } = useCreateOrderMutation({
    onSuccess: ({ order }) => {
      dispatch(set(order));
    },
  });

  const onOrderCreate = () => {
    const ingredients = [
      bun._id,
      ...constructor.map((ingredient) => ingredient._id),
    ];

    createOrder({ ingredients });
  };

  const [, dropTargetRef] = useDrop<Ingredient>({
    accept: INGREDIENT_TYPE,
    drop: (ingredient) => {
      dispatch(append({ ...ingredient, uid: getUID() }));
    },
  });

  const totalPrice = useMemo(() => {
    return (
      constructor.reduce((acc, ingredient) => acc + ingredient.price, 0) +
      bun?.price * 2
    );
  }, [bun, constructor]);

  return (
    <div
      {...props}
      ref={dropTargetRef}
      className={classNames(styles.container, className)}
    >
      {isNil(bun) ? (
        <div className={styles['container--empty']}>
          <p className="text text_type_main-medium">Пусто</p>
        </div>
      ) : (
        <>
          <Constructor />
          <div className={styles.container__price_wrapper}>
            <p
              className={classNames(
                styles.price,
                'text',
                'text_type_digits-medium',
              )}
            >
              {totalPrice}
              <CurrencyIcon type="primary" />
            </p>
            <Button
              htmlType="button"
              onClick={onOrderCreate}
              disabled={isPending}
            >
              {isPending ? 'Оформляем заказ' : 'Оформить заказ'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
