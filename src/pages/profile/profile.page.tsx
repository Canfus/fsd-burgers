import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { TextField } from '@shared/widget';
import { Button } from '@shared/ui';
import type { SubmitHandler, SubmitErrorHandler } from '@shared/types';
import { isStringEmpty, isUndefined } from '@shared/utils';
import { useGetUserQuery, useUpdateUserMutation, queryKeys } from '@shared/api';

import type { Schema } from './profile.interface';
import { schema } from './profile.schema';
import { defaultValues } from './profile.constants';
import styles from './profile.module.css';

const ProfilePage = () => {
  const queryClient = useQueryClient();

  const { data } = useGetUserQuery();

  const { control, handleSubmit, reset, formState, getFieldState } =
    useForm<Schema>({
      resolver: zodResolver(schema),
      defaultValues,
    });

  useEffect(() => {
    if (data) {
      reset(data.user);
    }
  }, [data, reset]);

  const { mutate: update } = useUpdateUserMutation({
    onSuccess: ({ user }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.getUser(),
      });

      reset(user);

      toast('Профиль успешно обновлен');
    },
  });

  const onSuccessSubmit: SubmitHandler<Schema> = (values) => {
    const submitValues: Schema = {};

    const entries = Object.entries(values) as [keyof Schema, string][];

    entries.map(([key, value]) => {
      if (!isUndefined(value) && !isStringEmpty(value)) {
        if (getFieldState(key).isDirty) {
          submitValues[key] = value;
        }
      }
    });

    update(submitValues);
  };

  const onRejectSubmit: SubmitErrorHandler<Schema> = (errors) => {
    console.error('Submit failed', errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSuccessSubmit, onRejectSubmit)}
      className={styles.form}
    >
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
        autoComplete="off"
      />
      <Button htmlType="submit" disabled={!formState.isDirty}>
        Сохранить
      </Button>
    </form>
  );
};

export default ProfilePage;
