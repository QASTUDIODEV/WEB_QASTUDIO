import type { TCommonResponse } from '../common/common';

export type TGetProjectList = TCommonResponse<{
  projectList: {
    projectId: Number;
    projectImage: string;
    projectName: string;
  }[];
}>;
export type TAddProject = TCommonResponse<{
  userId: number;
  projectId: number;
  projectName: string;
  projectImage: string;
  projectUrl: string;
  memberEmails: string[];
}>;
export type TAddProjectValue = {
  projectImage: string;
  projectName: string;
  projectUrl: string;
  memberEmailList: {
    userId: number;
    email: string;
  }[];
};
export type TGetTeamMember = TCommonResponse<{
  userEmails: {
    userId: number;
    email: string;
  }[];
}>;
export type TRequestTeamMember = {
  projectId: number;
  email: string;
};
export type TGetUserSidebarInfoResponse = TCommonResponse<{
  nickname: string;
  profileImage: string;
}>;
