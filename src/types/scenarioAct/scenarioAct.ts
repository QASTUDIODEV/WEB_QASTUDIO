import type { TCommonResponse } from '../common/common';

export type TGetCharacterListResponse = TCommonResponse<{
  detailCharacters: [
    {
      characterId: number;
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

export type TGetProjectInfoValues = {
  projectId: string;
};
