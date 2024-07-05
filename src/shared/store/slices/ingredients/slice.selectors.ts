import { createSelector } from '@reduxjs/toolkit';

import type { Ingredient } from '@shared/api';

import type { RootState } from '../../store.interface';

export const selectIngredientList = createSelector(
  [(store: RootState) => store.ingredientsReducer.ingredients],
  (ingredients: Ingredient[]) => ingredients,
);

export const selectBunIngredientList = createSelector(
  [(store: RootState) => store.ingredientsReducer.ingredients],
  (ingredients: Ingredient[]) =>
    ingredients.filter((ingredient) => ingredient.type === 'bun'),
);

export const selectMainIngredientList = createSelector(
  [(store: RootState) => store.ingredientsReducer.ingredients],
  (ingredients: Ingredient[]) =>
    ingredients.filter((ingredient) => ingredient.type === 'main'),
);

export const selectSauceIngredientList = createSelector(
  [(store: RootState) => store.ingredientsReducer.ingredients],
  (ingredients: Ingredient[]) =>
    ingredients.filter((ingredient) => ingredient.type === 'sauce'),
);

export const selectSelectedIngredient = createSelector(
  [(store: RootState) => store.ingredientsReducer.selectedIngredient],
  (selected) => selected,
);
