import type {
  TCreateScenaioValues,
  TCreateScenarioResponse,
  TEditActionResponse,
  TEditActionValues,
  TExecuteScenarioResponse,
  TExecuteScenarioValues,
  TFetchPageSourceResponse,
  TFetchPageSourceValues,
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
  return data;
};

const createScenario = async (scenario: TCreateScenaioValues): Promise<TCreateScenarioResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/scenarios`, scenario);
  console.log(data);
  return data;
};

const executeScenario = async (values: TExecuteScenarioValues): Promise<TExecuteScenarioResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/scenarios/${values.scenarioId}/sessions/${values.sessionId}/execute`, { baseUrl: values.baseUrl });
  return data;
};

const fetchPageSource = async ({ targetUrl }: TFetchPageSourceValues): Promise<TFetchPageSourceResponse> => {
  console.log(targetUrl);
  const { data } = await axiosInstance.post(`/api/v0/selenium/fetchPageSource`, { targetUrl });
  console.log(data);
  return data;
};

export { createScenario, editAction, executeScenario, fetchPageSource, getCharacterList, getProjectInfo, getScenarioList };
