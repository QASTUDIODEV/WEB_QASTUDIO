import type { TGetProjectInfoResponse, TGetProjectInfoValues } from '@/types/scenarioAct/scenarioAct';

import { axiosInstance } from '../axiosInstance';

const getCharacterList = async ({ projectId }: TGetProjectInfoValues): Promise<TGetProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters`);
  console.log(data);
  return data;
};

const getProjectInfo = async ({ projectId }: TGetProjectInfoValues): Promise<TGetProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  console.log(data);
  return data;
};
export { getCharacterList, getProjectInfo };
