import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useProjectList from '@/hooks/sidebar/sidebar';

import { isNowSignup } from '@/slices/authSlice';

function LoginRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { useGetSidebarUserInfo } = useProjectList();
  const { data: userInfo, isError } = useGetSidebarUserInfo;
  const urlParams = new URLSearchParams(location.search);
  const status = urlParams.get('status') || '';
  const message = urlParams.get('message') || '';

  useEffect(() => {
    if (sessionStorage.getItem('loginHandled') == null) {
      if (isError || status === 'error') {
        if (message === 'This social account cannot be linked.') {
          navigate('/mypage?error=socialLink');
          return;
        } else {
          navigate('/');
        }
      }
      if (userInfo?.result.nickname === '') {
        navigate('/signup/userSetting');
        dispatch(isNowSignup({ isSignup: true }));
      } else {
        navigate('/project');
      }
    }
  }, [navigate, location]);

  return <div>로그인 처리 중...</div>;
}

export default LoginRedirect;
