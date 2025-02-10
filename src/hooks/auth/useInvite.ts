import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { inviteAccept } from '@/apis/auth/auth';

import { useCoreQuery } from '../common/customQuery';

export default function useInvite(token: string) {
  const useInviteAccept = useCoreQuery(QUERY_KEYS.GET_INVITE_ACCEPT, () => inviteAccept({ token: token }));
  return { useInviteAccept };
}
