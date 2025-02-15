import type { TProjectInfo } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { editIntroduce, getCharacter, getMemberEmail, getPageSummaryList, getPath, getProjectInfo, getProjectMember } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export function useProjectInfo({ projectId }: TProjectInfo) {
  const useProjectExtractInfo = useCoreQuery(QUERY_KEYS.PROJECT_INFO({ projectId }), () => getProjectInfo({ projectId }), {
    enabled: !!projectId,
    staleTime: 60 * 5 * 1000,
  });
  const useEditIntroduce = useCoreMutation(editIntroduce, {});
  const useGetProjectMember = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER({ projectId }), () => getProjectMember({ projectId }), { enabled: !!projectId });
  const useGetMemberEmail = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER_EMAIL({ projectId }), () => getMemberEmail({ projectId }), { enabled: !!projectId });
  const useGetPageSummary = useCoreQuery(QUERY_KEYS.PAGE_SUMMARY({ projectId }), () => getPageSummaryList({ projectId }), { enabled: !!projectId });
  const useGetCharacter = useCoreQuery(QUERY_KEYS.CHARACTER({ projectId }), () => getCharacter({ projectId }), { enabled: !!projectId });
  const useGetPath = useCoreQuery(QUERY_KEYS.PATH({ projectId }), () => getPath({ projectId }), { enabled: !!projectId });
  return { useProjectExtractInfo, useEditIntroduce, useGetProjectMember, useGetMemberEmail, useGetPageSummary, useGetCharacter, useGetPath };
}
