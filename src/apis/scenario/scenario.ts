import type {
  TGetCharacterListResponse,
  TGetCharacterListValue,
  TGetCharacterScenarioListResponse,
  TGetSummaryProjectInfoResponse,
  TRequestCharacterScenarioResponse,
  TRequestPatchCharacterScenarioValue,
  TRequestPostCharacterScenarioValue,
  TResponseProjectPages,
} from '@/types/scenario/scenario';

import { axiosInstance } from '../axiosInstance';

const getSummaryProjectInfo = async (projectId: string): Promise<TGetSummaryProjectInfoResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  return data;
};

const getCharacterList = async ({ projectId, currentPage }: TGetCharacterListValue): Promise<TGetCharacterListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters/paged?page=${currentPage}`);
  return data;
};

const getCharacterScenarioList = async (characterId: number): Promise<TGetCharacterScenarioListResponse> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/characters/${characterId}/scenarios`);
  return data;
};

const postCharacterScenario = async ({
  projectId,
  characterName,
  characterDescription,
  accessPage,
}: TRequestPostCharacterScenarioValue): Promise<TRequestCharacterScenarioResponse> => {
  const { data } = await axiosInstance.post(`/api/v0/projects/${projectId}/characters`, { characterName, characterDescription, accessPage });
  return data;
};

const patchCharacterScenario = async ({
  projectId,
  characterId,
  scenarioId,
  characterName,
  characterDescription,
  accessPage,
}: TRequestPatchCharacterScenarioValue): Promise<TRequestCharacterScenarioResponse> => {
  const { data } = await axiosInstance.patch(`/api/v0/projects/${projectId}/characters/${characterId}/scenarios/${scenarioId}`, {
    characterName,
    characterDescription,
    accessPage,
  });
  return data;
};

const getProjectPage = async (projectId: string): Promise<TResponseProjectPages> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/pages`);
  return data;
};

const deleteScenario = async (scenarioId: number[]) => {
  const { data } = await axiosInstance.delete(`/api/v0/scenarios`, { data: { scenarioId } });
  return data;
};

const deleteCharacter = async (characterId: number[]) => {
  const { data } = await axiosInstance.delete(`/api/v0/projects/characters`, { data: { characterId } });
  return data;
};

const getAllPaths = async (projectId: string) => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/characters/paths`);
  return data;
};

export {
  deleteCharacter,
  deleteScenario,
  getAllPaths,
  getCharacterList,
  getCharacterScenarioList,
  getProjectPage,
  getSummaryProjectInfo,
  patchCharacterScenario,
  postCharacterScenario,
};
