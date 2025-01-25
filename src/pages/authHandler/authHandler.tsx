import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { refresh } from '@/apis/auth/auth';

import { logout, refreshToken, selectAuth } from '@/slices/authSlice';

function AuthHandler() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectAuth);

  useEffect(() => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) return;

    let timerId: ReturnType<typeof setTimeout>;

    const refreshTokens = async () => {
      try {
        const newTokens = await refresh();
        dispatch(
          refreshToken({
            accessToken: newTokens,
          }),
        );
        console.log('새로운 토큰 발급 완료:', newTokens);
      } catch (error) {
        console.error('Token refresh failed:', error);
        dispatch(logout());
        window.location.href = '/';
      }
    };

    if (accessToken) {
      timerId = setTimeout(
        () => {
          refreshTokens().catch((error) => console.error('Unexpected error during token refresh:', error));
        },
        20 * 1000 * 60,
      ); // 20분
    }

    return () => clearTimeout(timerId);
  }, [accessToken, dispatch]);

  return null;
}

export default AuthHandler;
