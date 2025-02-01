import type {
  TGetCharacterListResponse,
  TGetCharacterListValue,
  TGetCharacterScenarioListResponse,
  TGetSummaryProjectInfoResponse,
} from '@/types/scenario/scenario';

import { axiosInstance } from '../axiosInstance';

const getSummaryProjectInfo = async (projectId: string): Promise<TGetSummaryProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  return data;
};

const getCharacterList = async ({ projectId, currentPage }: TGetCharacterListValue): Promise<TGetCharacterListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters?page=${currentPage}`);
  return data;
};

const getCharacterScenarioList = async (characterId: string): Promise<TGetCharacterScenarioListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/characters/${characterId}/scenarios `);
  return data;
};
export { getCharacterList, getCharacterScenarioList, getSummaryProjectInfo };
