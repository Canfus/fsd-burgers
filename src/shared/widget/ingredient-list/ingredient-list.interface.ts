import type { Ingredient } from '@shared/api';

export interface IngredientListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  ingredients: Ingredient[];
}

