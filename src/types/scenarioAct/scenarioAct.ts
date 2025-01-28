import type { TCommonResponse } from '../common/common';

export type TGetProjectInfoResponse = TCommonResponse<{
  projectCharacters: [
    {
      characterId: number;
      characterName: string;
      characterDescription: string;
      accessRightCnt: number;
      roleScenarioCnt: number;
      accessRightList: [string];
      scenarioList: [string];
    },
  ];
}>;

export type TGetProjectInfoValues = {
  projectId: string;
};
