import type { FallbackProps } from 'react-error-boundary';

import { Button } from '../../../ui';
import styles from './error-boundary.module.css';

export const ErrorBoundaryFallback = ({
  resetErrorBoundary,
  error,
}: FallbackProps) => {
  const message = error?.message ?? 'Что-то пошло не так';

  return (
    <div className={styles.fallback}>
      <h2 className="text text_type_main-large">Мы упали</h2>
      <p className="text text_type_main-default text_color_inactive">
        {message}
      </p>
      <Button htmlType="button" onClick={resetErrorBoundary}>
        Попробовать ещё раз
      </Button>
    </div>
  );
};
