import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useNavigate } from 'react-router-dom';

import { TextField } from '@shared/widget';
import { Button, Link } from '@shared/ui';
import type { SubmitHandler, SubmitErrorHandler } from '@shared/types';

import { useRegisterMutation } from '@shared/api';
import { setLocalStorageItem, getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@shared/constants';
import { routerGetUrls } from '@shared/router';

import { schema } from './register.schema';
import { defaultValues } from './register.constants';
import type { Schema } from './register.interface';
import styles from './register.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const token = getLocalStorageItem<string>(ACCESS_TOKEN);

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate: register } = useRegisterMutation({
    onSuccess: ({ accessToken, refreshToken }) => {
      setLocalStorageItem(ACCESS_TOKEN, accessToken);
      setLocalStorageItem(REFRESH_TOKEN, refreshToken);

      navigate(routerGetUrls.getProfilePage());
    },
  });

  const onSuccessSubmit: SubmitHandler<Schema> = (values) => {
    console.log('submit successful', values);

    register(values);
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
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <TextField control={control} name="name" placeholder="Имя" />
        <TextField
          control={control}
          name="email"
          type="email"
          placeholder="E-mail"
        />
        <TextField
          control={control}
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?{' '}
            <Link to={routerGetUrls.getLoginPage()}>Войти</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
