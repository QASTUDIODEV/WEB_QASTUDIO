import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetKakaoOAuth } from '@/hooks/auth/useGetOAuth';

export default function KakaoOAuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  const url = new URLSearchParams(location.search);
  const code = url.get('code') || '';

  const { data: response, isLoading, isError, isSuccess } = useGetKakaoOAuth(code);
  //api 완성 되면 수정하겠습니당
  useEffect(() => {
    if (isSuccess && response?.data) {
      console.log(response);
    }
  }, [isSuccess, response, navigate]);
  return <></>;
}
