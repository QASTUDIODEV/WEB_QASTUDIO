import type { TGetProjectInfoResponse, TGetProjectInfoValues } from '@/types/scenarioAct/scenarioAct';

import { axiosInstance } from '../axiosInstance';

const getProjectInfo = async ({ projectId }: TGetProjectInfoValues): Promise<TGetProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters/detail`);
  return data;
};

export { getProjectInfo };
