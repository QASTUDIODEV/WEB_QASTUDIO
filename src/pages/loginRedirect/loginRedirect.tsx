import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getCookie } from '@/utils/cookies';

import { isSignup, login } from '@/slices/authSlice';
// 일단 작동을 안하니까 무시해주세여......
function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStorage.getItem('loginHandled') == null) {
      const existing_user = getCookie('existing_user') ?? '';
      const accessToken = getCookie('accessToken') ?? '';
      const refreshToken = getCookie('refreshToken') ?? '';
      if (accessToken === '' && refreshToken === '') {
        alert('로그인 또는 회원가입에 실패하였습니다.');
        navigate('/');
        return;
      }
      if (existing_user === 'false') {
        sessionStorage.setItem('loginHandled', 'true');
        dispatch(login({ accessToken: '', refreshToken: '' }));
        dispatch(isSignup({ isSignup: true }));
        navigate('/signup/userSetting');
        return;
      } else if (existing_user === 'true') {
        sessionStorage.setItem('loginHandled', 'true');
        dispatch(login({ accessToken: '', refreshToken: '' }));
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
