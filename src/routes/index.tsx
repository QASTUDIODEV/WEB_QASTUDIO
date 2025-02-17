import { createBrowserRouter } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider/modalProvider';

import InviteRedirect from '../pages/inviteRedirect/inviteRedirect';

import AuthLayout from '@/layouts/auth/auth.tsx';
import MainLayout from '@/layouts/main/mainLayout';
import AddProjectPage from '@/pages/addProject/addProject';
import DashboardPage from '@/pages/dashboard/dashboard';
import ErrorPage from '@/pages/error/error';
import FindingPassword from '@/pages/findingPassword/findingPassword';
import LoginPage from '@/pages/login/login.tsx';
import LoginRedirect from '@/pages/loginRedirect/loginRedirect';
import MyPage from '@/pages/mypage/mypage';
import ScenarioPage from '@/pages/scenario/scenario';
import ScenarioActPage from '@/pages/scenarioAct/scenarioAct';
import SignupPage from '@/pages/signup/signup';
import UserInfo from '@/pages/userInfo/userInfo';
import UserSetting from '@/pages/userSetting/userSetting';

export const router = createBrowserRouter([
  {
    path: '/scenarioAct/:projectId',
    element: (
      <>
        <ScenarioActPage />
        <ModalProvider />
      </>
    ),
  },
  {
    path: '/userInfo/:userId',
    element: <MainLayout />,
    children: [{ index: true, element: <UserInfo /> }],
  },
  {
    path: '/mypage',
    element: (
      <>
        <MainLayout />
        <ModalProvider />
      </>
    ),
    children: [{ index: true, element: <MyPage /> }],
  },
  {
    path: '/login/success',
    element: <LoginRedirect />,
  },
  {
    path: '/invite',
    element: <InviteRedirect />,
  },
  {
    path: `/`,
    element: (
      <>
        <AuthLayout />
        <ModalProvider />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/finding',
        element: <FindingPassword />,
      },
      {
        path: '/signup/userSetting',
        element: <UserSetting />,
      },
    ],
  },
  {
    path: '/project',
    element: (
      <>
        <MainLayout />
        <ModalProvider />
      </>
    ),
    children: [
      { index: true, element: <AddProjectPage /> },
      {
        path: 'dashboard/:projectId',
        element: <DashboardPage />,
      },
      {
        path: 'scenario/:projectId',
        element: <ScenarioPage />,
      },
      {
        path: 'information/:projectId',
        element: <AddProjectPage />,
      },
    ],
  },
]);
