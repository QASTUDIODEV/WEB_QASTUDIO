import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { QUERY_KEYS } from '@/constants/querykeys/queryKeys';

import { getCharacterList, getProjectInfo } from '@/apis/scenarioAct/scenarioAct';

import { useCoreQuery } from '@/hooks/common/customQuery';

import { setCharacterList, setProjectInfo } from '@/slices/scenarioActSlice';

export default function useProjectInfo(projectId: number | undefined) {
  const dispatch = useDispatch();

  // 프로젝트 정보 가져오기
  const useGetProjectInfo = useCoreQuery([QUERY_KEYS.GET_PROJECT_INFO, projectId], () => getProjectInfo({ projectId: projectId! }), {
    enabled: !!projectId,
  });

  // 역할 리스트 가져오기
  const useGetCharacterList = useCoreQuery([QUERY_KEYS.GET_CHARACTER_LIST2, projectId], () => getCharacterList({ projectId: projectId! }), {
    enabled: projectId !== null && projectId !== undefined,
  });

  useEffect(() => {
    if (useGetProjectInfo.data?.result) {
      dispatch(setProjectInfo(useGetProjectInfo.data.result));
    }
  }, [useGetProjectInfo.data, dispatch]);

  useEffect(() => {
    if (useGetCharacterList.data?.result) {
      dispatch(setCharacterList(useGetCharacterList.data.result));
    }
  }, [useGetCharacterList.data, dispatch]);

  return { useGetProjectInfo, useGetCharacterList };
}
