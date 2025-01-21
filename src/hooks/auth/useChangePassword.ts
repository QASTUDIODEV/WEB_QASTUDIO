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
  });
}
