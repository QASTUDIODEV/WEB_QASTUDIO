import axios from 'axios';

// import { refresh } from './auth/auth';
import { logout } from '@/slices/authSlice';
import store from '@/store/store';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

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
    if (error.response?.status === 401 && isRedirecting === false) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // const refreshResponse = await refresh();
          const refreshResponse = { code: 401 }; // 현재 리프레시 api가 없어 임시로 지정해두었습니다 현재 무조건 401을 반환하여 리다이렉트됩니다.
          if (refreshResponse.code === 200) {
            console.log('refreshToken이 재발급 되었습니다');
          } else {
            if (isRedirecting === false) {
              console.log('refreshToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
              isRedirecting = true;
              store.dispatch(logout());
              window.location.href = '/';
            }
          }
        } catch {
          if (isRedirecting === false) {
            store.dispatch(logout());
            isRedirecting = true;
            window.location.href = '/';
          }
        }
      } else {
        console.log('refreshToken이 없습니다. 로그인 페이지로 이동합니다.');
        if (isRedirecting === false) {
          isRedirecting = true;
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          store.dispatch(logout());
          window.location.href = '/';
        }
      }
    }

    return Promise.reject(error);
  },
);
