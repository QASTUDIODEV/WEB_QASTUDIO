import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '@/layouts/auth/auth.tsx';
import MainLayout from '@/layouts/main/mainLayout';
import AddProjectPage from '@/pages/addProject/addProject';
import BasicOAuthHandler from '@/pages/auth/basicOAuth';
import GithubOAuthHandler from '@/pages/auth/githubOAuth';
import GoogleOAuthHandler from '@/pages/auth/googleOAuth';
import KakaoOAuthHandler from '@/pages/auth/kakaoOAuth';
import DashboardPage from '@/pages/dashboard/dashboard';
import LoginPage from '@/pages/login/login.tsx';
import MyPage from '@/pages/mypage/mypage';
import ProjectInfoPage from '@/pages/projectInfo/projectInfo';
import ScenarioPage from '@/pages/scenario/scenario';
import ScenarioActPage from '@/pages/scenarioAct/scenarioAct';
import SignupPage from '@/pages/signup/signup';

export const router = createBrowserRouter([
  {
    path: '/auth/github-oauth',
    element: <GithubOAuthHandler />,
  },
  {
    path: '/auth/google-oauth',
    element: <GoogleOAuthHandler />,
  },
  {
    path: '/auth/kakao-oauth',
    element: <GoogleOAuthHandler />,
  },
  {
    path: '/auth/basic-oauth',
    element: <BasicOAuthHandler />,
  },
  {
    path: '/auth/kakao-oauth',
    element: <KakaoOAuthHandler />,
  },
  {
    path: '/scenario/:projectId/:scenarioId',
    element: <ScenarioActPage />,
  },
  {
    path: '/mypage',
    element: <MainLayout />,
    children: [{ index: true, element: <MyPage /> }],
  },

  {
    path: `/`,
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: '/project',
    element: <MainLayout />,
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
