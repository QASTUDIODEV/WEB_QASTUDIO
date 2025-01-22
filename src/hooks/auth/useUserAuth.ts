import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import type { TLoginResponse, TLoginValues, TSignupValues } from '@/types/auth/auth';

import { authSendEmailCode, changePassword, defaultLogin, defaultSignup, findingSendEmailCode } from '@/apis/auth/auth';

import { useCoreMutation } from '../common/customQuery';

import { login } from '@/slices/authSlice';

export default function useUserAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useSendSignupCode = useCoreMutation(authSendEmailCode, {});
  const useDefaultLogin = useCoreMutation(defaultLogin, {
    onSuccess: (data, variables) => {
      const loginResponse = data as TLoginResponse;
      const loginvariables = variables as TLoginValues;
      navigate('/project');
      const { token, nickname, profileImage } = loginResponse.result;
      const { accessToken, refreshToken } = token;
      dispatch(login({ email: loginvariables.email, accessToken: accessToken, refreshToken: refreshToken, nickname: nickname, profileImage: profileImage }));
    },
  });
  const useDefaultSignup = useCoreMutation(defaultSignup, {
    onSuccess: (variables) => {
      const signupVariables = variables as TSignupValues;
      const loginMutate = useDefaultLogin.mutate;
      loginMutate({ email: signupVariables.email, password: signupVariables.password });
    },
  });
  const useChangePassword = useCoreMutation(changePassword, {
    onSuccess: () => {
      navigate('/');
    },
  });
  const useSendFindingCode = useCoreMutation(findingSendEmailCode, {});
  return { useSendSignupCode, useDefaultLogin, useDefaultSignup, useChangePassword, useSendFindingCode };
}
