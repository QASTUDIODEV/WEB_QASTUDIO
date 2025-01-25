import type { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import ModalProvider from '@/components/common/modalProvider/modalProvider';

import AuthLayout from '@/layouts/auth/auth.tsx';
import MainLayout from '@/layouts/main/mainLayout';
import AddProjectPage from '@/pages/addProject/addProject';
import DashboardPage from '@/pages/dashboard/dashboard';
import FindingPassword from '@/pages/findingPassword/findingPassword';
import LoginPage from '@/pages/login/login.tsx';
import LoginRedirect from '@/pages/loginRedirect/loginRedirect';
import MyPage from '@/pages/mypage/mypage';
import ProjectInfoPage from '@/pages/projectInfo/projectInfo';
import ScenarioPage from '@/pages/scenario/scenario';
import ScenarioActPage from '@/pages/scenarioAct/scenarioAct';
import SignupPage from '@/pages/signup/signup';
import UserSetting from '@/pages/userSetting/userSetting';
import { selectAuth } from '@/slices/authSlice';

function ProtectedRoute({ children }: PropsWithChildren) {
  const { isAuthenticated } = useSelector(selectAuth);
  return isAuthenticated ? children : <Navigate to="/" />;
}

function ProtectedRouteUserSetting({ children }: PropsWithChildren) {
  const { isSignup } = useSelector(selectAuth);
  console.log(isSignup);
  return isSignup ? children : <Navigate to="/project" />;
}

// 개발 편의를 위해 지금은 ProtectedRoute를 씌어놓지는 않겠습니다..!

export const router = createBrowserRouter([
  {
    path: '/scenarioAct/:projectId',
    element: <ScenarioActPage />,
  },
  {
    path: '/mypage',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <MyPage /> }],
  },
  {
    path: '/login/success',
    element: <LoginRedirect />,
  },
  {
    path: `/`,
    element: (
      <>
        <AuthLayout />
        <ModalProvider />
      </>
    ),
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
        element: (
          <ProtectedRouteUserSetting>
            <UserSetting />
          </ProtectedRouteUserSetting>
        ),
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
        element: <ProjectInfoPage />,
      },
    ],
  },
]);
