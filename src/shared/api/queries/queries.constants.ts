export const STALE_TIME = 5 * 60 * 1000;

export const queryKeys = {
  /**
   * Ключ для кеширования данных юзера
   */
  getUser: () => ['user'],
  /**
   * Ключ для кеширования списка ингредиентов
   */
  getIngredientList: () => ['ingredients'],
  /**
   * Ключ для кеширования заказа
   * @param number номер заказа
   */
  getOrder: (number: string) => ['order', number],
};

export const endpoints = {
  /**
   * Эндпоинт для получения данных юзера
   */
  getUser: () => ['auth', 'user'].join('/'),
  /**
   * Эндпоинт для обновления данных юзера
   */
  getUpdateUser: () => ['auth', 'user'].join('/'),
  /**
   * Эндпоинт для авторизации
   */
  getLogin: () => ['auth', 'login'].join('/'),
  /**
   * Эндпоинт для регистрации
   */
  getRegister: () => ['auth', 'register'].join('/'),
  /**
   * Эндпоинт для выхода из системы
   */
  getLogout: () => ['auth', 'logout'].join('/'),
  /**
   * Эндпоинт для обновления токена
   */
  getUpdateToken: () => ['auth', 'token'].join('/'),
  /**
   * Эндпоинт для получения кода для восстановления пароля
   */
  getForgotPassword: () => ['password-reset'].join('/'),
  /**
   * Эндпоинт для восстановления пароля
   */
  getResetPassword: () => ['password-reset', 'reset'].join('/'),
  /**
   * Эндпоинт для создания заказа
   */
  getCreateOrder: () => ['orders'].join('/'),
  /**
   * Эндпоинт для получения списка ингредиентов
   */
  getIngredientList: () => ['ingredients'].join('/'),
  /**
   * Эндпоинт для получения заказа
   * @param number номер заказа
   */
  getOrder: (number: string) => ['orders', number].join('/'),
};
