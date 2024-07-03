import classNames from 'classnames';
import { useState, useEffect, useRef, type FC } from 'react';

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
  const scrollContainer = useRef<HTMLUListElement>(null);
  const titleRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  const [tabSelected, setTabSelected] = useState<string>('bun');

  const onTabChange = (value: string) => {
    setTabSelected(value);

    titleRefs.current[value]?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  const buns = useAppSelector(selectBunIngredientList);
  const mains = useAppSelector(selectMainIngredientList);
  const sauces = useAppSelector(selectSauceIngredientList);

  useEffect(() => {
    const headers: Record<string, boolean> = {};

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const type = entry.target.id;

        headers[type] = entry.isIntersecting;

        for (const header in headers) {
          if (headers[header]) {
            setTabSelected(header);

            break;
          }
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: scrollContainer.current,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(titleRefs.current).forEach((title) => {
      if (title) {
        observer.observe(title);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
        <Tab active={tabSelected === 'bun'} value="bun" onClick={onTabChange}>
          Булки
        </Tab>
        <Tab
          active={tabSelected === 'sauce'}
          value="sauce"
          onClick={onTabChange}
        >
          Соусы
        </Tab>
        <Tab active={tabSelected === 'main'} value="main" onClick={onTabChange}>
          Начинки
        </Tab>
      </div>

      <ul ref={scrollContainer} className={styles.container__scroll}>
        <IngredientList
          ref={(node) => (titleRefs.current['bun'] = node)}
          id="bun"
          title="Булки"
          ingredients={buns}
          className={styles.list__item}
        />
        <IngredientList
          ref={(node) => (titleRefs.current['sauce'] = node)}
          id="sauce"
          title="Соусы"
          ingredients={sauces}
          className={styles.list__item}
        />
        <IngredientList
          ref={(node) => (titleRefs.current['main'] = node)}
          id="main"
          title="Начинки"
          ingredients={mains}
          className={styles.list__item}
        />
      </ul>
    </div>
  );
};

