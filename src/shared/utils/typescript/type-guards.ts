import type { Nil } from '../../types';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isStringEmpty = (value: unknown): value is string =>
  isString(value) && !value.length;

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

export const isNil = (value: unknown): value is Nil =>
  isNull(value) || isUndefined(value);

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean';

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value);

export const isArrayEmpty = (value: unknown): value is boolean =>
  isArray(value) && !value.length;

export const isFunction = (value: unknown): value is boolean =>
  typeof value === 'function';

export const isPrimitive = (value: unknown): value is boolean =>
  isString(value) || isNumber(value) || isNull(value);
