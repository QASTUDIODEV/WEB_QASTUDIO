import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import getCookie from '@/utils/getCookie';

const LOGIN_HANDLED_KEY = 'loginHandled';
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!sessionStorage.getItem(LOGIN_HANDLED_KEY)) {
      const urlParams = new URLSearchParams(location.search);
      const nickname = urlParams.get('nickname');

      if (!nickname) {
        // sessionStorage.setItem(LOGIN_HANDLED_KEY, 'true');
        navigate('/signup/userSetting');
        return;
      } else if (nickname !== '') {
        sessionStorage.setItem(LOGIN_HANDLED_KEY, 'true');
        const accessToken = getCookie(ACCESS_TOKEN_KEY);
        const refreshToken = getCookie(REFRESH_TOKEN_KEY);
        console.log();
        if (accessToken && refreshToken) {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        }
        navigate('/project');
        return;
      } else {
        navigate('/');
        return;
      }
    }
  }, []);

  return <div>로그인 처리 중...</div>;
}

export default LoginRedirect;
