import type { Schema } from './reset-password.interface.ts';

export const defaultValues: Schema = {
  password: '',
  repeatPassword: '',
  token: '',
};
