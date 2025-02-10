import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useInvite from '@/hooks/auth/useInvite';

function InviteRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get('invite') || '';
  localStorage.setItem('inviteToken', token);
  const { useInviteAccept } = useInvite(token);
  const { data } = useInviteAccept;
  useEffect(() => {
    if (data) {
      localStorage.removeItem('inviteToken');
      navigate(`/project/information/${data.result.projectId}`);
    }
  }, [navigate, location]);

  return <div>초대 처리 중...</div>;
}

export default InviteRedirect;
