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
