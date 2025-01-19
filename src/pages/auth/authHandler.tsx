import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { refresh } from '@/apis/auth/auth';

import { logout, refreshToken, selectAuth } from '@/slices/authSlice';

function AuthHandler() {
  const dispatch = useDispatch();
  const { refreshToken: currentRefreshToken } = useSelector(selectAuth);

  useEffect(() => {
    if (!currentRefreshToken) return;

    const refreshTokens = async () => {
      try {
        const newTokens = await refresh();
        dispatch(
          refreshToken({
            accessToken: newTokens,
          }),
        );
      } catch (error) {
        console.error('Token refresh failed:', error);
        alert('Your session has expired. Please log in again.');
        dispatch(logout());
      }
    };

    const intervalId = setInterval(
      () => {
        refreshTokens().catch((error) => console.error('Unexpected error during token refresh:', error));
      },
      4 * 60 * 1000,
    );

    refreshTokens().catch((error) => console.error('Unexpected error during initial token refresh:', error));

    return () => clearInterval(intervalId);
  }, [currentRefreshToken, dispatch]);

  return null;
}

export default AuthHandler;
