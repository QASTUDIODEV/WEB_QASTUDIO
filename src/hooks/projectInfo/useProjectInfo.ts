import type { TProjectInfo } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { deleteProject, editIntroduce, getCharacter, getMemberEmail, getPath, getProjectMember } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export function useProjectInfo({ projectId }: TProjectInfo) {
  const useEditIntroduce = useCoreMutation(editIntroduce, {});
  const useGetProjectMember = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER({ projectId }), () => getProjectMember({ projectId }), { enabled: !!projectId });
  const useGetMemberEmail = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER_EMAIL({ projectId }), () => getMemberEmail({ projectId }), { enabled: !!projectId });
  const useGetCharacter = useCoreQuery(QUERY_KEYS.CHARACTER({ projectId }), () => getCharacter({ projectId }), { enabled: !!projectId });
  const useGetPath = useCoreQuery(QUERY_KEYS.PATH({ projectId }), () => getPath({ projectId }), { enabled: !!projectId });
  const useDeleteProject = useCoreMutation(deleteProject);

  return { useDeleteProject, useEditIntroduce, useGetProjectMember, useGetMemberEmail, useGetCharacter, useGetPath };
}
