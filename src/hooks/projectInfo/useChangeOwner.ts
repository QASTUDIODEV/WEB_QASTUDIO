import { changeOwner, deleteMember } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation } from '../common/customQuery';

export function useChangeOwner() {
  const useChangeOwn = useCoreMutation(changeOwner);
  const useDeleteMember = useCoreMutation(deleteMember);
  return { useChangeOwn, useDeleteMember };
}
