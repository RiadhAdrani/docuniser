import './samples/node-api';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';
import browserRouter from './router';

import './locales/i18n';

import './index.css';
import 'virtual:uno.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={browserRouter} />
    </NextUIProvider>
  </React.StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
