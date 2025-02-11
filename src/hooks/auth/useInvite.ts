import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { inviteAccept, inviteAcceptNewMember } from '@/apis/auth/auth';
import { getUserEmail } from '@/apis/userInfo/userInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export default function useInvite() {
  const useInviteAccept = useCoreMutation(inviteAccept);
  const useInviteAcceptNewMember = useCoreMutation(inviteAcceptNewMember);
  const useGetUserEmail = useCoreQuery(QUERY_KEYS.GET_USER_EMAIL, () => getUserEmail());
  return { useInviteAccept, useGetUserEmail, useInviteAcceptNewMember };
}
