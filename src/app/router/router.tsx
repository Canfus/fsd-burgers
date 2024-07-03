import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { routerRoutes } from '@shared/router';
import AppLayout from '@pages/layout';

import { AuthProvider } from '../providers';

const ProfileLayout = lazy(() => import('@pages/profile/layout'));
const ProfilePage = lazy(() => import('@pages/profile'));

const ForgotPasswordPage = lazy(() => import('@pages/forgot-password'));
const ResetPasswordPage = lazy(() => import('@pages/reset-password'));

const LoginPage = lazy(() => import('@pages/login'));
const RegisterPage = lazy(() => import('@pages/register'));

const HomePage = lazy(() => import('@pages/home'));

export const Router = () => (
  <Routes>
    <Route path={routerRoutes.home} element={<AppLayout />}>
      {/* LABEL: protected routes start */}
      <Route element={<AuthProvider />}>
        <Route path={routerRoutes.profile} element={<ProfileLayout />}>
          <Route index element={<ProfilePage />} />
          <Route
            path={routerRoutes.profileOrders}
            element={<div>Profile orders page</div>}
          />
          <Route
            path={routerRoutes.profileOrdersById}
            element={<div>My order page</div>}
          />
        </Route>
      </Route>
      {/* LABEL: protected routes end */}
      <Route index element={<HomePage />} />
      <Route
        path={routerRoutes.ingredients}
        element={<div>Ingredients wrapper</div>}
      >
        <Route
          path={routerRoutes.ingredientsById}
          element={<div>Ingredient page</div>}
        />
      </Route>
      <Route path={routerRoutes.feed} element={<div>Feed page</div>} />
      <Route
        path={routerRoutes.feedById}
        element={<div>Feed by id page</div>}
      />
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
      <Route path={routerRoutes.notFound} element={<div>Not found page</div>} />
    </Route>
  </Routes>
);
