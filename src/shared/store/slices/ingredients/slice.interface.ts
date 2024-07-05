import type { Ingredient } from '@shared/api';

export interface Slice {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient | null;
}
