import type { BaseResponse } from '../base-response.interface';

export interface Ingredient {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IngredientList {
  data: Ingredient[];
}

export type IngredientListResponse = BaseResponse<IngredientList>;

