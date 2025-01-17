import axios from 'axios';

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
