import type {
  TCreateScenaioValues,
  TCreateScenarioResponse,
  TEditActionResponse,
  TEditActionValues,
  TExecuteScenarioValues,
  TGetCharacterListResponse,
  TGetProjectInfoResponse,
  TGetProjectInfoValues,
  TGetScenarioInfoResponse,
} from '@/types/scenarioAct/scenarioAct';

import { axiosInstance } from '../axiosInstance';

const getProjectInfo = async ({ projectId }: TGetProjectInfoValues): Promise<TGetProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  return data;
};

const getCharacterList = async ({ projectId }: TGetProjectInfoValues): Promise<TGetCharacterListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters`);
  return data;
};

const getScenarioList = async ({ characterId }: TGetProjectInfoValues): Promise<TGetScenarioInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/scenarios/characters/${characterId}`);
  return data;
};

const editAction = async (editData: TEditActionValues): Promise<TEditActionResponse> => {
  const { data } = await axiosInstance.patch(`/api/v0/actions/${editData.actionId}`, editData.data);
  console.log(data);
  return data;
};

const createScenario = async (scenario: TCreateScenaioValues): Promise<TCreateScenarioResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/scenarios`, scenario);
  return data;
};

//아직
const executeScenario = async (props: TExecuteScenarioValues): Promise<TCreateScenarioResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/scenarios/${props.scenarioId}/sessions/${props.sessionId}/execute`, props.baseUrl);
  return data;
};

export { createScenario, editAction, executeScenario, getCharacterList, getProjectInfo, getScenarioList };
