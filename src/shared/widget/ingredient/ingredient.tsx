import { FC } from 'react';
import classNames from 'classnames';

import { CurrencyIcon } from '@shared/icons';
import { Counter } from '@shared/ui';

import type { IngredientProps } from './ingredient.interface';
import styles from './ingredient.module.css';

export const Ingredient: FC<IngredientProps> = ({
  ingredient,
  count = 0,
  className,
  ...props
}) => (
  <div {...props} className={classNames(styles.ingredient, className)}>
    <img
      src={ingredient.image}
      alt="Ingredient picture"
      className={styles.ingredient__image}
    />
    <section
      className={classNames(
        styles.ingredient__currency,
        'text',
        'text_type_digits-default',
      )}
    >
      <span>{ingredient.price}</span>
      <CurrencyIcon type="primary" />
    </section>
    <p className="text text_type_main-small">{ingredient.name}</p>
    {count > 0 && <Counter count={count} />}
  </div>
);

