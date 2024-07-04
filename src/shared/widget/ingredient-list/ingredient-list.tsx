import classNames from 'classnames';
import { forwardRef } from 'react';

import { constructorActions, useAppDispatch } from '@shared/store';

import { Ingredient } from '../ingredient';

import type { IngredientListProps } from './ingredient-list.interface';
import styles from './ingredient-list.module.css';

export const IngredientList = forwardRef<
  HTMLHeadingElement,
  IngredientListProps
>(({ title, ingredients, className, id, ...props }, ref) => {
  const dispatch = useAppDispatch();
  const { append } = constructorActions;

  return (
    <div {...props} className={classNames(styles.list__wrapper, className)}>
      <h2 ref={ref} id={id} className="text text_type_main-medium">
        {title}
      </h2>
      <div className={styles.list}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            onClick={(ingredient) => dispatch(append(ingredient))}
          />
        ))}
      </div>
    </div>
  );
});
