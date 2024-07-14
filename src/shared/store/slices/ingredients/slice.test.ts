import axios from 'axios';
import '@testing-library/react';

import { endpoints } from '../../../api/queries/queries.constants';
import { IngredientListResponse } from '../../../api/models';
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
});

