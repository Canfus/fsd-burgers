import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate } from 'react-router-dom';

import { TextField } from '@shared/widget';
import { Button, Link } from '@shared/ui';
import type { SubmitHandler, SubmitErrorHandler } from '@shared/types';

import { useForgotPasswordMutation } from '@shared/api';
import { getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN } from '@shared/constants';
import { routerGetUrls } from '@shared/router';

import { schema } from './forgot-password.schema';
import { defaultValues } from './forgot-password.constants';
import type { Schema } from './forgot-password.interface';
import styles from './forgot-password.module.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const token = getLocalStorageItem<string>(ACCESS_TOKEN);

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate: login } = useForgotPasswordMutation({
    onSuccess: () => {
      navigate(routerGetUrls.getResetPasswordPage(), {
        state: {
          forgot_confirm: true,
        },
      });
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

  return (
    <div className={styles.page}>
      <form
        onSubmit={handleSubmit(onSuccessSubmit, onRejectSubmit)}
        className={styles.page__form}
      >
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <TextField
          control={control}
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <Button type="primary" htmlType="submit">
          Восстановить
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

export default ForgotPasswordPage;
