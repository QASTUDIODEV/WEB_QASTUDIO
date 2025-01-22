import type { TCommonResponse } from '../common/common';

export type TGetProjectList = TCommonResponse<{
  projectList: {
    projectId: number;
    projectImage: string;
    projectName: string;
  }[];
}>;
