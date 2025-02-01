import axios from 'axios';

import { MODAL_TYPES } from '@/components/common/modalProvider/modalProvider';

import { logout, refresh } from './auth/auth';

import { openModal } from '@/slices/modalSlice';
import store from '@/store/store';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (isRedirecting) {
        return Promise.reject(error);
      }

      isRedirecting = true;
      try {
        const refreshResponse = await refresh();

        if (refreshResponse.code === 200) {
          console.log('refreshToken이 재발급 되었습니다');
          isRedirecting = false;
          return axiosInstance(error.config);
        } else {
          throw new Error('Refresh failed');
        }
      } catch (refreshError) {
        store.dispatch(openModal({ modalType: MODAL_TYPES.AuthModal }));
        console.log('refreshToken이 만료되었습니다. 로그인 페이지로 이동합니다.', refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
