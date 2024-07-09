import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routerRoutes } from '@shared/router';
import AppLayout from '@pages/layout';

import { AuthProvider } from '../providers';

const ProfileLayout = lazy(() => import('@pages/profile/layout'));
const ProfilePage = lazy(() => import('@pages/profile'));
const ProfileOrdersPage = lazy(() => import('@pages/profile/orders'));
const OrderDetailsPage = lazy(() => import('@pages/order-details'));

const ForgotPasswordPage = lazy(() => import('@pages/forgot-password'));
const ResetPasswordPage = lazy(() => import('@pages/reset-password'));

const LoginPage = lazy(() => import('@pages/login'));
const RegisterPage = lazy(() => import('@pages/register'));

const HomePage = lazy(() => import('@pages/home'));

const FeedPage = lazy(() => import('@pages/feed'));

export const Router = () => (
  <Routes>
    <Route path={routerRoutes.home} element={<AppLayout />}>
      {/* LABEL: protected routes start */}
      <Route element={<AuthProvider />}>
        <Route path={routerRoutes.profile} element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route
            path={routerRoutes.profileOrders}
            element={<ProfileOrdersPage />}
          />
        </Route>
        <Route
          path={routerRoutes.profileOrdersById}
          element={<OrderDetailsPage />}
        />
      </Route>
      {/* LABEL: protected routes end */}
      <Route index element={<HomePage />} />
      <Route path={routerRoutes.feed} element={<FeedPage />} />
      <Route path={routerRoutes.feedById} element={<OrderDetailsPage />} />
      <Route path={routerRoutes.login} element={<LoginPage />} />
      <Route path={routerRoutes.register} element={<RegisterPage />} />
      <Route
        path={routerRoutes.forgotPassword}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={routerRoutes.resetPassword}
        element={<ResetPasswordPage />}
      />
      <Route path={routerRoutes.notFound} element={<div>Not found page</div>} />{' '}
      // TODO:
    </Route>
  </Routes>
);
