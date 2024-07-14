import axios from 'axios';
import '@testing-library/react';

import { endpoints } from '../../../api/queries/queries.constants';
import { IngredientListResponse, Ingredient } from '../../../api/models';
import { store, ingredientsActions } from '../..';

const { dispatch, getState } = store;

describe('Ingredient testing case', () => {
  const { set } = ingredientsActions;

  it('Should add ingredient list', () => {
    axios
      .get<IngredientListResponse>(endpoints.getIngredientList())
      .then(({ data }) => {
        dispatch(set(data.data));

        const { ingredients } = getState().ingredientsReducer;

        expect(ingredients.length).toBeGreaterThan(0);
      });
  });

  it('Should select single ingredient', () => {
    const { select } = ingredientsActions;

    const bun: Ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    };

    dispatch(select(bun));

    const { selectedIngredient } = getState().ingredientsReducer;

    expect(selectedIngredient).toEqual(bun);
  });

  it('Should remove selected ingredient', () => {
    const { select, remove } = ingredientsActions;

    const bun: Ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    };

    dispatch(select(bun));

    dispatch(remove());

    const { selectedIngredient } = getState().ingredientsReducer;

    expect(selectedIngredient).toBeNull();
  });
});

