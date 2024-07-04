import classNames from 'classnames';
import { useMemo, type FC } from 'react';

import { Button } from '@shared/ui';
import { CurrencyIcon } from '@shared/icons';
import { useAppSelector, selectConstructor } from '@shared/store';
import { isNil } from '@shared/utils';

import { Constructor } from '../constructor';

import type { ConstructorContainerProps } from './constructor-container.interface';
import styles from './constructor-container.module.css';

export const ConstructorContainer: FC<ConstructorContainerProps> = ({
  className,
  ...props
}) => {
  const [bun, ...constructor] = useAppSelector(selectConstructor);

  const totalPrice = useMemo(() => {
    return (
      constructor.reduce((acc, ingredient) => acc + ingredient.price, 0) +
      bun?.price * 2
    );
  }, [bun, constructor]);

  return (
    <div {...props} className={classNames(styles.container, className)}>
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
            <Button htmlType="button">Оформить заказ</Button>
          </div>
        </>
      )}
    </div>
  );
};
