import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { changePassword } from '@/apis/auth/auth';

import { useCoreMutation } from '../common/customQuery';

export default function useChangePassword() {
  const navigate = useNavigate();

  return useCoreMutation(changePassword, {
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다');
      navigate('/');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.';
      toast.error(errorMessage);
    },
  });
}
