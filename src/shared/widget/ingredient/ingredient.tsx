import { FC } from 'react';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';

import { CurrencyIcon } from '@shared/icons';
import { Counter } from '@shared/ui';
import {
  useAppDispatch,
  useAppSelector,
  ingredientsActions,
  selectConstructor,
} from '@shared/store';
import { INGREDIENT_TYPE } from '@shared/constants';

import type { IngredientProps } from './ingredient.interface';
import styles from './ingredient.module.css';

export const Ingredient: FC<IngredientProps> = ({
  ingredient,
  className,
  ...props
}) => {
  const [, dragRef] = useDrag(
    {
      type: INGREDIENT_TYPE,
      item: ingredient,
    },
    [ingredient],
  );

  const dispatch = useAppDispatch();
  const { select } = ingredientsActions;

  const constructor = useAppSelector(selectConstructor);

  const count = constructor.filter(
    (item) => item._id === ingredient._id,
  ).length;

  const onIngredientSelect = () => {
    dispatch(select(ingredient));
  };

  return (
    <div
      {...props}
      ref={dragRef}
      role="button"
      aria-hidden
      aria-label="Ingredient"
      onClick={onIngredientSelect}
      className={classNames(styles.ingredient, className)}
    >
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
      <p
        className={classNames(
          styles.ingredient__name,
          'text',
          'text_type_main-small',
        )}
      >
        {ingredient.name}
      </p>
      {count > 0 && <Counter count={count} />}
    </div>
  );
};
