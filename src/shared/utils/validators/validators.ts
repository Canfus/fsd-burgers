import z from 'zod';

import { defaultMessages } from './validators.constants';
import { isStringEmpty } from '../typescript';

export const validators = {
  getStringRequiredValidationSchema: (message?: string) =>
    z
      .string()
      .min(1, message || defaultMessages.string)
      .default(''),
  getStringOptionalValidationSchema: () => z.string().optional(),
  getStringEmailValidationSchema: (message?: string) =>
    z
      .string()
      .email(message || defaultMessages.string)
      .default(''),
  getStringPasswordValidationSchema: (message?: string) =>
    z.string().superRefine((value, context) => {
      if (isStringEmpty(value)) {
        context.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'string',
          minimum: 1,
          inclusive: false,
          message: message || defaultMessages.string,
        });
      }

      if (!/[0-9]/g.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'regex',
          message: 'Пароль должен содержать как минимум 1 цифру',
        });
      }

      if (!/[A-Z]/g.test(value)) {
        context.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'regex',
          message: 'Пароль должен содержать как минимум 1 заглавную букву',
        });
      }
    }),
};
