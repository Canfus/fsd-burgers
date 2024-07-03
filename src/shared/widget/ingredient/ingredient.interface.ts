import type { Ingredient } from '@shared/api';

export interface IngredientProps extends React.HTMLAttributes<HTMLDivElement> {
  ingredient: Ingredient;
  count?: number;
}

