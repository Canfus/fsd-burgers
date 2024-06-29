import { isNil, isNull } from '../typescript';

export const setLocalStorageItem = <T>(key: string, value: T): void => {
  if (isNil(value)) {
    return;
  }

  const stringifiesPayload = JSON.stringify(value);

  localStorage.setItem(key, stringifiesPayload);
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);

  if (isNull(item)) {
    return null;
  }

  try {
    return JSON.parse(item) as T;
  } catch {
    return item as T;
  }
};

export const clearLocalStorage = (...keys: string[]): void => {
  keys.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const resetLocalStorage = (): void => {
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (!isNull(key)) {
      localStorage.removeItem(key);
    }
  }
};
