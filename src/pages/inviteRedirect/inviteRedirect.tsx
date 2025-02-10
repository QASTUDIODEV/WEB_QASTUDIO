import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useInvite from '@/hooks/auth/useInvite';

function InviteRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('token') || '';

  localStorage.setItem('inviteToken', token);
  const { useInviteAccept } = useInvite();
  const { mutate: inviteMutate } = useInviteAccept;

  useEffect(() => {
    try {
      inviteMutate(
        { token },
        {
          onSuccess: (inviteResponse) => {
            localStorage.removeItem('inviteToken');
            navigate(`/project/information/${inviteResponse?.result.projectId}`);
          },
          onError: () => {
            navigate('/');
          },
        },
      );
    } catch {
      navigate('/');
    }
  }, [navigate, location]);

  return <div>초대 처리 중...</div>;
}

export default InviteRedirect;
