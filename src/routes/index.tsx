import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layouts/auth/auth.tsx';
import LoginPage from '@/pages/login/login.tsx';

export const router = createBrowserRouter([
  {
    path: `/`,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
]);
