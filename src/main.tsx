import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { queryClient } from './apis/queryClient';
import App from './App.tsx';
import AuthHandler from './pages/auth/authHandler.tsx';

import store from '@/store/store.ts';
import GlobalStyle from '@/styles/global.ts';
import theme from '@/styles/theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyle />
          <AuthHandler />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
