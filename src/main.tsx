import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/ReactToastify.min.css';

import { App } from '@app/app';
import '@app/assets/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
