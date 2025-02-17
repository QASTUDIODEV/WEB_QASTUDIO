import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { editProject, getTeamMemberAllEmail } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export function useEditProjects({ projectId }: { projectId: number }) {
  const useEditProject = useCoreMutation(editProject);
  const useGetTeamMemberAllEmail = useCoreQuery(QUERY_KEYS.GET_ALL_MEMBER_EMAIL({ projectId }), () => getTeamMemberAllEmail({ projectId }));

  return { useEditProject, useGetTeamMemberAllEmail };
}
