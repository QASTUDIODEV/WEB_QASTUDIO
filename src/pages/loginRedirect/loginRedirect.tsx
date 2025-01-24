import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { login } from '@/slices/authSlice';

function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem('loginHandled') == null) {
      const urlParams = new URLSearchParams(location.search);
      const nickname = urlParams.get('nickname') ?? '';
      const accessToken = urlParams.get('accessToken') ?? '';
      const refreshToken = urlParams.get('refreshToken') ?? '';
      const email = urlParams.get('email') ?? '';
      const profileImage = urlParams.get('profileImage') ?? '';

      if (accessToken !== '' && refreshToken !== '') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        alert('로그인 또는 회원가입에 실패하였습니다.');
        navigate('/');
      }

      if (nickname === '') {
        sessionStorage.setItem('loginHandled', 'true');
        dispatch(login({ email, accessToken, refreshToken, nickname, profileImage }));
        navigate('/signup/userSetting');
        return;
      } else if (nickname !== '') {
        sessionStorage.setItem('loginHandled', 'true');
        navigate('/project');
        return;
      } else {
        alert('로그인 또는 회원가입에 실패하였습니다.');
        navigate('/');
        return;
      }
    }
  }, [navigate, location]);

  return <div>로그인 처리 중...</div>;
}

export default LoginRedirect;
