import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getKakaoOAuth } from '@/apis/auth/auth';

export default function KakaoOAuthHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  function useGetKakaoOAuth(_code: string) {
    return useQuery({
      queryFn: () => getKakaoOAuth(_code),
      queryKey: ['getKakaoOAuth', _code],
    });
  }

  const url = new URLSearchParams(location.search);
  const code = url.get('code') || '';

  const { data: response, isLoading, isError, isSuccess } = useGetKakaoOAuth(code);

  useEffect(() => {
    if (isSuccess && response?.data) {
      console.log(response);
    }
  }, [isSuccess, response, navigate]);
  return <></>;
}
