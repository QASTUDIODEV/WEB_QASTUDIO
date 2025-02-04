import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getAllPaths, getCharacterList, getSummaryProjectInfo } from '@/apis/scenario/scenario';

import { useCoreQuery } from '../common/customQuery';

type TScenarioInfoValue = {
  projectId: string;
  currentPage: number;
};
export default function useGetScenarioInfo({ projectId, currentPage }: TScenarioInfoValue) {
  const useGetProjectSummary = useCoreQuery(QUERY_KEYS.GET_SUMMARY_PROJECT_INFO(projectId), () => getSummaryProjectInfo(projectId));
  const useGetCharacterList = useCoreQuery(QUERY_KEYS.GET_CHARACTER_LIST({ projectId, currentPage }), () => getCharacterList({ projectId, currentPage }), {
    enabled: currentPage !== -1 && currentPage != null,
  });
  const useGetAllPaths = useCoreQuery(QUERY_KEYS.GET_ALL_PATHS(projectId), () => getAllPaths(projectId), {
    enabled: !!projectId,
  });

  return { useGetProjectSummary, useGetCharacterList, useGetAllPaths };
}
