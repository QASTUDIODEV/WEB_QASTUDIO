import type { DEVICE, STACK } from '@/enums/enums';

import type { TCommonResponse } from '../common/common';

type TDetailCharacters = {
  characterId: number;
  characterName: string;
  characterDescription: string;
  author: string;
  pageCnt: number;
  scenarioCnt: number;
  accessPageList: string[];
  scenarioList: string[];
  createdAt: string;
  updatedAt: string;
};

type TScenarioList = {
  scenarioId: number;
  scenarioName: string;
  author: string;
  createdAt: string;
  updatedAt: string;
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
  detailCharacters: TDetailCharacters[];
  isLast: boolean;
  isFirst: boolean;
}>;
export type TGetCharacterScenarioListResponse = TCommonResponse<{
  scenarioList: TScenarioList[];
}>;
