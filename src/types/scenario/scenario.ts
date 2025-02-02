import type { DEVICE, STACK } from '@/enums/enums';

import type { TCommonResponse } from '../common/common';

type TDetailCharacters = {
  characterId: number;
  characterName: string;
  characterDescription: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  scenarios: string[];
};

type TScenarioList = {
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
};

export type TRequestPatchCharacterScenarioValue = {
  projectId: number;
  characterId: number;
  scenarioId: number;
  characterName: string;
  characterDescription: string;
  accessPage: string[];
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
