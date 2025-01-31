import type { TCommonResponse } from '../common/common';

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
    userId: number;
    email: string;
  }[];
};

export type TPageSummary = TCommonResponse<{
  pageSummaryList: {
    pageId: number;
    pageName: string;
    pageDescription: string;
    path: string;
    hasAccess: string[];
    deniedAccess: string[];
    scenarios: string[];
  }[];
}>;
