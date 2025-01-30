import axios from 'axios';

import { logout, refresh } from './auth/auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axios.defaults.withCredentials = true;

let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true;

      try {
        const refreshResponse = await refresh();

        if (refreshResponse.code === 200) {
          console.log('refreshToken이 재발급 되었습니다');
          isRedirecting = false;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.log('refreshToken이 만료되었습니다. 로그인 페이지로 이동합니다.', refreshError);
        logout();
        window.location.href = '/';
      } finally {
        isRedirecting = false;
      }
    }

    return Promise.reject(error);
  },
);
