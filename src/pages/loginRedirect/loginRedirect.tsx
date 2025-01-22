import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import getCookie from '@/utils/getCookie';

function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!sessionStorage.getItem('loginHandled')) {
      const urlParams = new URLSearchParams(location.search);
      const nickname = urlParams.get('nickname');
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }

      if (!nickname) {
        sessionStorage.setItem('loginHandled', 'true');
        navigate('/signup/userSetting');
        return;
      } else if (nickname !== '') {
        sessionStorage.setItem('loginHandled', 'true');
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
