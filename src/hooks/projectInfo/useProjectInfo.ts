import type { TProjectInfo } from '@/types/projectInfo/projectInfo';
import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getProjectInfo } from '@/apis/projectInfo/projectInfo';

import { useCoreQuery } from '../common/customQuery';

export function useProjectInfo({ projectId }: TProjectInfo) {
  const useProjectExtractInfo = useCoreQuery(QUERY_KEYS.PROJECT_INFO({ projectId }), () => getProjectInfo({ projectId }));
  return { useProjectExtractInfo };
}
