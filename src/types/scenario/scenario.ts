import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { DEVICE, STACK } from '@/enums/enums';

import type { TCommonResponse } from '../common/common';

export type TUseMutationCustomAIOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, TResponseAIError, TVariables, unknown>,
  'mutationFn'
>;

export type TResponseAIError = AxiosError<{
  type: string;
  title: string;
  statusCode: number;
  detail: string;
  instance: string;
}>;

export type TDetailCharacters = {
  characterId: number;
  characterName: string;
  characterDescription: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  scenarios: TScenarios;
};

export type TScenarios = {
  scenarioList: TScenarioList[];
};
export type TScenarioList = {
  scenarioId: number;
  scenarioName: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type TPageSummaryList = {
  pageId: number;
  pageName: string;
  pageDescription: string;
  path: string;
  hasAccess: string[];
  deniedAccess: string[];
  scenarios: string[];
};

export type TGetCharacterListValue = {
  projectId: string;
  currentPage: number;
};

export type TGetSummaryProjectInfoResponse = TCommonResponse<{
  projectId: number;
  projectImage: string;
  projectName: string;
  projectUrl: string;
  introduction: string;
  viewType: DEVICE;
  developmentSkill: STACK;
  assistantId: string;
}>;

export type TGetCharacterListResponse = TCommonResponse<{
  characters: TDetailCharacters[];
  listSize: number;
  totalPage: number;
  totalElements: number;
  isLast: boolean;
  isFirst: boolean;
}>;

export type TGetCharacterScenarioListResponse = TCommonResponse<{
  scenarioList: TScenarioList[];
}>;

export type TRequestPostCharacterScenarioValue = {
  projectId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
  aiScenario: boolean;
};

export type TRequestPatchCharacterScenarioValue = {
  projectId: number;
  characterId: number;
  scenarioId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
  aiScenario: boolean;
};

export type TRequestCharacterScenarioResponse = TCommonResponse<{
  characterId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
  scenarioId: number;
  scenarioDescription: string;
}>;

export type TResponseProjectPages = TCommonResponse<{
  pageSummaryList: TPageSummaryList[];
}>;

export type TProjectPath = {
  pageId: number;
  path: string;
};
export type TResponseGetAllPaths = TCommonResponse<{
  projectPaths: TProjectPath[];
}>;
