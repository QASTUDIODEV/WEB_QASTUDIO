import { useDispatch } from 'react-redux';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterList, getProjectInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

import { setCharacterList, setProjectInfo } from '@/slices/scenarioActSlice';

export default function useProjectInfo(projectId: number | undefined) {
  const dispatch = useDispatch();

  const useGetProjectInfo = useCoreQuery([QUERY_KEYS.GET_PROJECT_INFO, projectId], () => getProjectInfo({ projectId: projectId! }), {
    enabled: !!projectId,
    select: (data) => {
      dispatch(setProjectInfo(data.result));
      return data;
    },
  });

  const useGetCharacterList = useCoreQuery([QUERY_KEYS.GET_CHARACTER_LIST, projectId], () => getCharacterList({ projectId: projectId! }), {
    enabled: !!projectId,
    select: (data) => {
      dispatch(setCharacterList(data.result));
      return data;
    },
  });

  return { useGetProjectInfo, useGetCharacterList };
}
