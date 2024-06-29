import { Routes, Route } from 'react-router-dom';

import { routerRoutes } from '@shared/router';
import AppLayout from '@pages/layout';

import { AuthProvider } from '../providers';

export const Router = () => (
  <Routes>
    <Route path={routerRoutes.home} element={<AppLayout />}>
      {/* LABEL: protected routes start */}
      <Route element={<AuthProvider />}>
        <Route path={routerRoutes.profile} element={<div>Profile layout</div>}>
          <Route index element={<div>Profile page</div>} />
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
      <Route index element={<div>Main page</div>} />
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
      <Route path={routerRoutes.login} element={<div>Login page</div>} />
      <Route path={routerRoutes.register} element={<div>Register page</div>} />
      <Route
        path={routerRoutes.forgotPassword}
        element={<div>Forgot password page</div>}
      />
      <Route
        path={routerRoutes.resetPassword}
        element={<div>Reset password page</div>}
      />
      <Route path={routerRoutes.notFound} element={<div>Not found page</div>} />
    </Route>
  </Routes>
);
