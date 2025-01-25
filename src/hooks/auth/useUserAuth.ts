import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authSendEmailCode, changePassword, defaultLogin, defaultSignup, findingSendEmailCode, userSetting } from '@/apis/auth/auth';

import { useCoreMutation } from '../common/customQuery';

import { isSignup } from '@/slices/authSlice';

export default function useUserAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useSendSignupCode = useCoreMutation(authSendEmailCode);
  const useDefaultLogin = useCoreMutation(defaultLogin);
  const useDefaultSignup = useCoreMutation(defaultSignup);
  const useChangePassword = useCoreMutation(changePassword, {
    onSuccess: () => {
      navigate('/');
    },
  });
  const useSendFindingCode = useCoreMutation(findingSendEmailCode);
  const useSettingUserInfo = useCoreMutation(userSetting, {
    onSuccess: () => {
      navigate('/project');
      dispatch(isSignup({ isSignup: false }));
    },
  });
  return { useSendSignupCode, useSettingUserInfo, useDefaultLogin, useDefaultSignup, useChangePassword, useSendFindingCode };
}
