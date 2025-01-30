import type { TProjectInfo } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { editIntroduce, getMemberEmail, getProjectInfo, getProjectMember } from '@/apis/projectInfo/projectInfo';

import { useCoreMutation, useCoreQuery } from '../common/customQuery';

export function useProjectInfo({ projectId }: TProjectInfo) {
  const useProjectExtractInfo = useCoreQuery(QUERY_KEYS.PROJECT_INFO({ projectId }), () => getProjectInfo({ projectId }));
  const useEditIntroduce = useCoreMutation(editIntroduce, {});
  const useGetProjectMember = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER({ projectId }), () => getProjectMember({ projectId }));
  const useGetMemberEmail = useCoreQuery(QUERY_KEYS.PROJECT_MEMBER_EMAIL({ projectId }), () => getMemberEmail({ projectId }));
  return { useProjectExtractInfo, useEditIntroduce, useGetProjectMember, useGetMemberEmail };
}
