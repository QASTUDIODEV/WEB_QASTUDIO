import type { TProjectInfo } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import {
  deleteProject,
  editIntroduce,
  editProject,
  getCharacter,
  getMemberEmail,
  getPageSummaryList,
  getPath,
  getProjectInfo,
  getProjectMember,
  getTeamMemberAllEmail,
} from '@/apis/projectInfo/projectInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export function useProjectInfo({ projectId }: TProjectInfo) {
  const useProjectExtractInfo = useCoreQuery(QUERY_KEYS.PROJECT_INFO({ projectId }), () => getProjectInfo({ projectId }), {
    enabled: !!projectId,
    staleTime: 60 * 5 * 1000,
  });
  const useEditProject = useCoreMutation(editProject);
  const useEditIntroduce = useCoreMutation(editIntroduce, {});
  const useGetProjectMember = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER({ projectId }), () => getProjectMember({ projectId }), { enabled: !!projectId });
  const useGetMemberEmail = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER_EMAIL({ projectId }), () => getMemberEmail({ projectId }), { enabled: !!projectId });
  const useGetPageSummary = useCoreQuery(QUERY_KEYS.PAGE_SUMMARY({ projectId }), () => getPageSummaryList({ projectId }), { enabled: !!projectId });
  const useGetCharacter = useCoreQuery(QUERY_KEYS.CHARACTER({ projectId }), () => getCharacter({ projectId }), { enabled: !!projectId });
  const useGetPath = useCoreQuery(QUERY_KEYS.PATH({ projectId }), () => getPath({ projectId }), { enabled: !!projectId });
  const useDeleteProject = useCoreMutation(deleteProject);
  const useGetTeamMemberAllEmail = useCoreQuery(QUERY_KEYS.GET_ALL_MEMBER_EMAIL({ projectId }), () => getTeamMemberAllEmail({ projectId }));
  return {
    useProjectExtractInfo,
    useGetTeamMemberAllEmail,
    useDeleteProject,
    useEditIntroduce,
    useGetProjectMember,
    useGetMemberEmail,
    useGetPageSummary,
    useGetCharacter,
    useGetPath,
    useEditProject,
  };
}
