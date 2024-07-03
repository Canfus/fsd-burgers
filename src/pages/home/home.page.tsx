import { type FC } from 'react';

import { useGetIngredientListQuery } from '@shared/api';
import { useAppDispatch, ingredientsActions } from '@shared/store';

import { IngredientContainer } from './components';
import styles from './home.module.css';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { set } = ingredientsActions;

  const { data } = useGetIngredientListQuery();

  dispatch(set(data.data));

  return (
    <div className={styles.page}>
      <IngredientContainer />
    </div>
  );
};

export default HomePage;

