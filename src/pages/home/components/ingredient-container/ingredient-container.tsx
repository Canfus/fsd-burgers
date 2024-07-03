import classNames from 'classnames';
import { useState, type FC } from 'react';

import {
  useAppSelector,
  selectBunIngredientList,
  selectMainIngredientList,
  selectSauceIngredientList,
} from '@shared/store';
import { IngredientList } from '@shared/widget';
import { Tab } from '@shared/ui';

import type { IngredientContainerProps } from './ingredient-container.interface';
import styles from './ingredient-container.module.css';

export const IngredientContainer: FC<IngredientContainerProps> = ({
  className,
  ...props
}) => {
  const [tabSelected, setTabSelected] = useState<string>('bun');

  const buns = useAppSelector(selectBunIngredientList);
  const mains = useAppSelector(selectMainIngredientList);
  const sauces = useAppSelector(selectSauceIngredientList);

  return (
    <div {...props} className={classNames(styles.container, className)}>
      <h1
        className={classNames(
          styles.container__title,
          'text',
          'text_type_main-large',
        )}
      >
        Соберите бургер
      </h1>

      <div className={styles.tabs__wrapper}>
        <Tab
          active={tabSelected === 'bun'}
          value="bun"
          onClick={setTabSelected}
        >
          Булки
        </Tab>
        <Tab
          active={tabSelected === 'sauce'}
          value="sauce"
          onClick={setTabSelected}
        >
          Соусы
        </Tab>
        <Tab
          active={tabSelected === 'main'}
          value="main"
          onClick={setTabSelected}
        >
          Начинки
        </Tab>
      </div>

      <ul className={styles.container__scroll}>
        <IngredientList
          title="Булки"
          ingredients={buns}
          className={styles.list__item}
        />
        <IngredientList
          title="Соусы"
          ingredients={sauces}
          className={styles.list__item}
        />
        <IngredientList
          title="Начинки"
          ingredients={mains}
          className={styles.list__item}
        />
      </ul>
    </div>
  );
};

