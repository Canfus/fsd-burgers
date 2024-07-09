import { getUrl } from '../utils';
import { routerRoutes } from './router.routes';
import type { OrderParams } from '@shared/router/router.interface';

export const routerGetUrls = {
  /**
   * Главная страница
   */
  getHomePage: () => routerRoutes.home,
  /**
   * Страница ленты заказов
   */
  getFeedPage: () => routerRoutes.feed,
  /**
   * Страница заказа с детальной информацией
   * @param params айди заказа
   */
  getFeedPageById: (params: OrderParams) =>
    getUrl(routerRoutes.feedById, params),
  /**
   * Страница профиля
   */
  getProfilePage: () => routerRoutes.profile,
  /**
   * Страница личных заказов
   */
  getProfileOrdersPage: () => routerRoutes.profileOrders,
  /**
   * Страница личного заказа с детальной информацией
   * @param params айди заказа
   */
  getProfileOrderById: (params: OrderParams) =>
    getUrl(routerRoutes.profileOrdersById, params),
  /**
   * Страница логина
   */
  getLoginPage: () => routerRoutes.login,
  /**
   * Страница регистрации
   */
  getRegisterPage: () => routerRoutes.register,
  /**
   * Страница сброса пароля
   */
  getForgotPasswordPage: () => routerRoutes.forgotPassword,
  /**
   * Страница восстановления пароля
   */
  getResetPasswordPage: () => routerRoutes.resetPassword,
};
