import { useNavigate } from 'react-router-dom';

import { authSendEmailCode, changePassword, defaultLogin, defaultSignup, findingSendEmailCode, userSetting } from '@/apis/auth/auth';

import { useCoreMutation } from '../common/customQuery';

export default function useUserAuth() {
  const navigate = useNavigate();
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
    },
  });
  return { useSendSignupCode, useSettingUserInfo, useDefaultLogin, useDefaultSignup, useChangePassword, useSendFindingCode };
}
