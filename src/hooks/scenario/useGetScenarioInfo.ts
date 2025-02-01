import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterList, getSummaryProjectInfo } from '@/apis/scenario/scenario';

// import { queryClient } from '../../apis/queryClient';
import { useCoreQuery } from '../common/customQuery';

type TScenarioInfoValue = {
  projectId: string;
  currentPage: number;
};
export default function useGetScenarioInfo({ projectId, currentPage }: TScenarioInfoValue) {
  const useGetProjectSummary = useCoreQuery(QUERY_KEYS.GET_SUMMARY_PROJECT_INFO(projectId), () => getSummaryProjectInfo(projectId));
  const useGetCharacterList = useCoreQuery(QUERY_KEYS.GET_CHARACTER_LIST({ projectId, currentPage }), () => getCharacterList({ projectId, currentPage }));

  return { useGetProjectSummary, useGetCharacterList };
}
