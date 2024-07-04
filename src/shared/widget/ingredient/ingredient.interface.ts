import type { Ingredient } from '@shared/api';

export interface IngredientProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  ingredient: Ingredient;
  count?: number;
  onClick?: (ingredient: Ingredient) => void;
}
