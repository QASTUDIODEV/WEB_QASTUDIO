import axios from 'axios';

import { refresh } from './auth/auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    if (error.response?.status === 401) {
      if (error.response.data.message === 'Unauthorized') {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken !== undefined) {
          const response = await refresh();
          if (response.status === 200) {
            console.log('refreshToken이 재발급 되었습니다');
          } else if (response.status === 401) {
            console.log('refreshToken이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            window.location.href = '/';
          } else {
            console.log('알 수 없는 오류가 발생했습니다.', response.status);
          }
        } else {
          console.log('refreshToken이 없습니다. 로그인 페이지로 이동합니다.');
          if (!isRedirecting) {
            isRedirecting = true;
            window.location.href = '/';
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
