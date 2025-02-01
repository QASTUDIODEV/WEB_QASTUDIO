import { inviteMember } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation } from '../common/customQuery';

export default function useInviteMember() {
  const useInvite = useCoreMutation(inviteMember, {});
  return { useInvite };
}
