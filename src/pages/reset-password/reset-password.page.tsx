import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { TextField } from '@shared/widget';
import { Button, Link } from '@shared/ui';
import type { SubmitHandler, SubmitErrorHandler } from '@shared/types';

import { useResetPasswordMutation } from '@shared/api';
import { getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN } from '@shared/constants';
import { routerGetUrls } from '@shared/router';

import { schema } from './reset-password.schema.ts';
import { defaultValues } from './reset-password.constants.ts';
import type { Schema } from './reset-password.interface.ts';
import styles from './reset-password.module.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const token = getLocalStorageItem<string>(ACCESS_TOKEN);

  const { control, setError, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate: login } = useResetPasswordMutation({
    onSuccess: () => {
      navigate(routerGetUrls.getLoginPage());
    },
    onError: (error) => {
      const { status } = error.response || {};

      if (status === 404) {
        setError('token', {
          message: 'Неправильный код',
        });
      }
    },
  });

  const onSuccessSubmit: SubmitHandler<Schema> = (values) => {
    console.log('submit successful', values);

    login(values);
  };

  const onRejectSubmit: SubmitErrorHandler<Schema> = (errors) => {
    console.error('submit failed', errors);
  };

  if (token) {
    return <Navigate to={routerGetUrls.getHomePage()} replace />;
  }

  if (!state?.forgot_confirm) {
    return <Navigate to={routerGetUrls.getLoginPage()} replace />;
  }

  return (
    <div className={styles.page}>
      <form
        onSubmit={handleSubmit(onSuccessSubmit, onRejectSubmit)}
        className={styles.page__form}
      >
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <TextField
          control={control}
          name="password"
          type="password"
          placeholder="Введите новый пароль"
        />
        <TextField
          control={control}
          name="repeatPassword"
          type="password"
          placeholder="Повторите новый пароль"
        />
        <TextField
          control={control}
          name="token"
          placeholder="Введите код из письма"
        />
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{' '}
            <Link to={routerGetUrls.getLoginPage()}>Войти</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
