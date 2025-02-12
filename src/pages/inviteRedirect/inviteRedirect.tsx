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
            localStorage.setItem('InvitationResponse', 'success');
            localStorage.removeItem('inviteToken');
            navigate(`/project/information/${inviteResponse?.result.projectId}`);
          },
          onError: (error) => {
            if (error.response?.status === 401) {
              navigate('/');
            } else {
              localStorage.removeItem('inviteToken');
              localStorage.setItem('InvitationResponse', 'error');
              navigate('/project');
            }
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
