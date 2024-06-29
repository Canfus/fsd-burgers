import { Router } from './router';
import { RootProvider } from './providers';

export const App = () => (
  <RootProvider>
    <Router />
  </RootProvider>
);
