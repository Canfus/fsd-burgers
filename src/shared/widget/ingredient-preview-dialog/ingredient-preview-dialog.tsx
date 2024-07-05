import classNames from 'classnames';
import type { FC } from 'react';

import {
  useAppSelector,
  useAppDispatch,
  ingredientsActions,
  selectSelectedIngredient,
} from '@shared/store';
import { isNull } from '@shared/utils';

import { Dialog } from '../../ui';
import type { IngredientPreviewDialogProps } from './ingredient-preview-dialog.interface';
import styles from './ingredient-preview-dialog.module.css';

export const IngredientPreviewDialog: FC<IngredientPreviewDialogProps> = (
  props,
) => {
  const dispatch = useAppDispatch();
  const { remove } = ingredientsActions;

  const onDialogClose = () => {
    dispatch(remove());
  };

  const ingredient = useAppSelector(selectSelectedIngredient);

  const isOpen = !isNull(ingredient);

  if (isNull(ingredient)) {
    return null;
  }

  return (
    <Dialog
      {...props}
      open={isOpen}
      onOpenChange={onDialogClose}
      title="Детали ингредиента"
    >
      <img src={ingredient.image_large} alt="Ingredient preview" />
      <p
        className={classNames(
          styles.ingredient__name,
          'text',
          'text_type_main-medium',
        )}
      >
        {ingredient.name}
      </p>
      <div className={styles.ingredient__description_wrapper}>
        <div className={styles.ingredient__description}>
          <p className="text text_type_main-small text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.ingredient__description}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.ingredient__description}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.ingredient__description}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </Dialog>
  );
};
