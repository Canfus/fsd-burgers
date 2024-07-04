import classNames from 'classnames';
import { type FC } from 'react';
import { Reorder } from 'framer-motion';

import {
  useAppSelector,
  useAppDispatch,
  constructorActions,
  selectConstructor,
} from '@shared/store';
import { ConstructorElement } from '@shared/widget';
import { DragIcon } from '@shared/icons';
import { isNil, isArrayEmpty } from '@shared/utils';

import type { ConstructorProps } from './constructor.interface';
import styles from './constructor.module.css';

export const Constructor: FC<ConstructorProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const { update, remove } = constructorActions;

  const [bun, ...constructor] = useAppSelector(selectConstructor);

  if (isNil(bun)) {
    return null;
  }

  return (
    <div {...props} className={classNames(styles.constructor, className)}>
      <ConstructorElement
        text={bun.name}
        thumbnail={bun.image_mobile}
        price={bun.price}
        type="top"
        isLocked
        extraClass={styles.constructor__element}
      />
      {!isArrayEmpty(constructor) && (
        <Reorder.Group
          axis="y"
          as="ul"
          values={constructor}
          onReorder={(updated) => dispatch(update(updated))}
          className={styles.constructor__scroll}
        >
          {constructor.map((ingredient) => (
            <Reorder.Item
              key={ingredient.uid}
              as="li"
              value={ingredient}
              className={styles.constructor__item}
            >
              <section className={styles.constructor__item_drag}>
                <DragIcon type="primary" />
              </section>
              <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image_mobile}
                price={ingredient.price}
                handleClose={() => dispatch(remove(ingredient.uid))}
                extraClass={styles.constructor__element}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
      <ConstructorElement
        text={bun.name}
        thumbnail={bun.image_mobile}
        price={bun.price}
        type="bottom"
        isLocked
        extraClass={styles.constructor__element}
      />
    </div>
  );
};
