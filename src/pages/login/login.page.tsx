import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { TextField } from '@shared/widget';
import { Button, Link } from '@shared/ui';
import type { SubmitHandler, SubmitErrorHandler } from '@shared/types';

import { useLoginMutation } from '@shared/api';
import { setLocalStorageItem, getLocalStorageItem } from '@shared/utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@shared/constants';
import { routerGetUrls } from '@shared/router';
import { useAppDispatch, userActions } from '@shared/store';

import { schema } from './login.schema';
import { defaultValues } from './login.constants';
import type { Schema } from './login.interface';
import styles from './login.module.css';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { set } = userActions;

  const navigate = useNavigate();
  const { state } = useLocation();

  const token = getLocalStorageItem<string>(ACCESS_TOKEN);

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { mutate: login } = useLoginMutation({
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setLocalStorageItem(ACCESS_TOKEN, accessToken);
      setLocalStorageItem(REFRESH_TOKEN, refreshToken);

      dispatch(set(user));

      navigate(state.from ?? routerGetUrls.getHomePage());
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
        <h1 className="text text_type_main-medium">Вход</h1>
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
            Вы - новый пользователь?{' '}
            <Link to={routerGetUrls.getRegisterPage()}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{' '}
            <Link to={routerGetUrls.getForgotPasswordPage()}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
