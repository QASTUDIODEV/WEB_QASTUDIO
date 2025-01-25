import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import type { TToken } from '@/types/auth/auth';

import { refresh } from './auth/auth';

import { logout, refreshToken } from '@/slices/authSlice';
import store from '@/store/store';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    // 토큰이 필요 없는 api 경로는 추가해주세용
    const excludedPaths = ['/v0/auth/login', '/v0/auth/signup'];
    if (!excludedPaths.includes(config.url || '') && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRedirecting = false;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refreshTokenData = localStorage.getItem('refreshToken');
    if (!refreshTokenData) {
      handleUnauthenticated();
      return;
    }

    try {
      const response = await refresh();

      if (response.status === 200) {
        handleTokenRefreshSuccess(response.data, error.config);
        return axiosInstance.request(error.config);
      } else if (response.status === 401) {
        handleTokenRefreshFailure();
      } else {
        handleUnknownError(response.status);
      }
    } catch (refreshError) {
      console.error('토큰 재발급 중 오류 발생:', refreshError);
      handleUnauthenticated();
    }

    return Promise.reject(error);
  },
);

function handleUnauthenticated() {
  console.log('refreshToken이 없거나 만료되었습니다. 로그인 페이지로 이동합니다.');
  clearAuthData();
  redirectToLogin();
}

function handleTokenRefreshSuccess(tokens: TToken, originalRequestConfig: AxiosRequestConfig) {
  console.log('토큰이 재발급되었습니다.');
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  originalRequestConfig.headers = originalRequestConfig.headers || {};
  originalRequestConfig.headers.Authorization = `Bearer ${tokens.accessToken}`;
  store.dispatch(refreshToken({ accessToken: tokens.accessToken }));
}

function handleTokenRefreshFailure() {
  console.log('refreshToken이 만료되었습니다. 다시 로그인해주세요.');
  clearAuthData();
  redirectToLogin();
}

function handleUnknownError(status: number) {
  console.log('알 수 없는 오류가 발생했습니다.', status);
  clearAuthData();
  redirectToLogin();
}

function clearAuthData() {
  store.dispatch(logout());
}

function redirectToLogin() {
  if (!isRedirecting) {
    isRedirecting = true;
    window.location.href = '/';
  }
}
