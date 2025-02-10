import type { TCommonResponse } from '../common/common';

export type TInfoDTO = {
  result:
    | {
        projectId: number;
        projectImage: string;
        projectName: string;
        projectUrl: string;
        introduction: string;
        viewType: string;
        developmentSkill: string;
        assistantId: string;
      }
    | undefined;
};

export type TPageSummaryDTO = {
  pageId: number;
  pageName: string;
  pageDescription: string;
  path: string;
  hasAccess: string[];
  deniedAccess: string[];
  scenarios: string[];
};

export type TGetProjectInfo = TCommonResponse<{
  projectId: number;
  projectImage: string;
  projectName: string;
  projectUrl: string;
  introduction: string;
  viewType: string;
  developmentSkill: string;
  assistantId: string;
}>;

export type TProjectInfoRequest = {
  projectId: number;
  zipFile: File;
};

export type TProjectInfo = {
  projectId: number;
};

export type TEditRequest = {
  projectId: number;
  introduce: string;
};

export type TGetProjectMember = TCommonResponse<{
  members: {
    userId: number;
    projectRole: string;
    email: string;
    nickname: string;
    profileImage: string;
  }[];
}>;

export type TProjectMember = TCommonResponse<{
  userEmails: {
    userId: number;
    email: string;
  }[];
}>;

export type TRequestInvite = {
  projectId: number;
  memberEmailList: {
    email: string;
  }[];
};

export type TPageSummary = TCommonResponse<{
  pageSummaryList: TPageSummaryDTO[];
}>;
export type TAddPage = TCommonResponse<{
  pageId: number;
  pageName: string;
  pageDescription: string;
  path: string;
}>;
export type TAddPageRequest = {
  projectId: number;
  pageName: string;
  pageDescription: string;
  path: string;
  characterIdList: number[];
  scenarioList: string[];
};
export type TGetCharacter = TCommonResponse<{
  detailCharacters: {
    characterId: number;
    characterName: string;
    characterDescription: string;
    pageCnt: number;
    scenarioCnt: number;
    accessPageList: string[];
    scenarioList: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}>;
export type TGetScenario = TCommonResponse<{
  scenarioList: {
    scenarioId: number;
    scenarioName: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}>;
export type TCharacterId = {
  characterId: number;
};
export type TPath = TCommonResponse<{
  projectPaths: {
    pageId: number;
    path: string;
  }[];
}>;
