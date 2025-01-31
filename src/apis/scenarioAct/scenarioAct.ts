import type { TGetCharacterListResponse, TGetProjectInfoResponse, TGetProjectInfoValues, TGetScenarioInfoResponse } from '@/types/scenarioAct/scenarioAct';

import { axiosInstance } from '../axiosInstance';

const getProjectInfo = async ({ projectId }: TGetProjectInfoValues): Promise<TGetProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  console.log(data);
  return data;
};

const getCharacterList = async ({ projectId }: TGetProjectInfoValues): Promise<TGetCharacterListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters`);
  console.log(data);
  return data;
};

const getScenarioList = async ({ characterId }: TGetProjectInfoValues): Promise<TGetScenarioInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/scenarios/characters/${characterId}`);
  console.log(data);
  return data;
};

export { getCharacterList, getProjectInfo, getScenarioList };
