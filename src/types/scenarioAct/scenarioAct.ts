import type { TCommonResponse } from '../common/common';

export type TGetCharacterListResponse = TCommonResponse<{
  detailCharacters: [
    {
      characterId: number;
      characterName: string;
      author: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}>;

export type TGetProjectInfoResponse = TCommonResponse<{
  projectId: number;
  projectImage: string;
  projectName: string;
  projectUrl: string;
  introduction: string;
  viewType: string;
  developmentSkill: string;
  assistantId: string;
}>;

export type TGetScenarioInfoResponse = TCommonResponse<{
  characterId: number;
  scenarios: [
    {
      scenarioId: number;
      scenarioName: string;
      scenarioDescription: string;
      actions: [
        {
          actionId: number;
          actionDescription: string;
          step: number;
          actionType: string;
          locator: {
            strategy: string;
            value: string;
          };
          action: {
            type: string;
            value: string;
          };
        },
      ];
    },
  ];
}>;

export type TGetProjectInfoValues = {
  projectId?: number;
  characterId?: number;
  scenarioId?: number;
};
