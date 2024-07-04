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
              <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image_mobile}
                price={ingredient.price}
                handleClose={() => dispatch(remove(ingredient.uid))}
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
      />
    </div>
  );
};
