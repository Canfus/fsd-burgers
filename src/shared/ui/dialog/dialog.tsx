import { useLayoutEffect, type FC } from 'react';
import { createPortal } from 'react-dom';

import { CloseIcon } from '@shared/icons';
import { isNil } from '@shared/utils';

import type { DialogProps } from './dialog.inteface';
import styles from './dialog.module.css';

export const Dialog: FC<DialogProps> = ({
  open,
  onOpenChange,
  className,
  title,
  children,
  ...props
}) => {
  useLayoutEffect(() => {
    const onClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (!isNil(window)) {
      window.addEventListener('keydown', onClose);
    }

    return () => {
      if (!isNil(window)) {
        window.removeEventListener('keydown', onClose);
      }
    };
  }, []);

  if (!open) {
    return null;
  }

  const onCloseClick = () => {
    onOpenChange(false);
  };

  return createPortal(
    <div {...props} className={styles.dialog__wrapper}>
      <div
        className={styles.dialog__overlay}
        role="dialog"
        aria-hidden
        onClick={onCloseClick}
      />
      <div className={styles.dialog}>
        {title && <h3 className="text text_type_main-large">{title}</h3>}
        <button
          onClick={onCloseClick}
          aria-hidden
          aria-label="Close dialog"
          className={styles.dialog__close}
        >
          <CloseIcon type="primary" />
        </button>
        <div className={className}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
