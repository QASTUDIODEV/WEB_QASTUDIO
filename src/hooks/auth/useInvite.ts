import { inviteAccept, inviteAcceptNewMember } from '@/apis/auth/auth';

import { useCoreMutation } from '../common/customQuery';

export default function useInvite() {
  const useInviteAccept = useCoreMutation(inviteAccept);
  const useInviteAcceptNewMember = useCoreMutation(inviteAcceptNewMember);
  return { useInviteAccept, useInviteAcceptNewMember };
}
