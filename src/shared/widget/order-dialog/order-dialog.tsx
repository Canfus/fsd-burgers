import classNames from 'classnames';
import type { FC } from 'react';

import successIcon from '@app/assets/icons/success.png';

import { Dialog } from '../../ui';
import {
  useAppSelector,
  useAppDispatch,
  orderActions,
  selectOrderDialogState,
  selectOrder,
} from '../../store';
import { isNull } from '../../utils';

import type { OrderDialogProps } from './order-dialog.interface';
import styles from './order-dialog.module.css';

export const OrderDialog: FC<OrderDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { clear } = orderActions;

  const onDialogClose = () => {
    dispatch(clear());
  };

  const isOpen = useAppSelector(selectOrderDialogState);

  const order = useAppSelector(selectOrder);

  if (!isOpen || isNull(order)) {
    return null;
  }

  return (
    <Dialog
      {...props}
      open={isOpen}
      onOpenChange={onDialogClose}
      className={styles.dialog}
    >
      <h2
        className={classNames(
          styles.order__number,
          'text',
          'text_type_digits-large',
          'mb-8',
        )}
      >
        {order.number}
      </h2>
      <p className="text text_type_main-small">идентификатор заказа</p>
      <img
        src={successIcon}
        alt="Order successfully created"
        className="text text_type_main-default mt-15 mb-15"
      />
      <p className="text text_type_main-small mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </Dialog>
  );
};

