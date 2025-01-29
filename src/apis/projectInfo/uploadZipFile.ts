import type { TGetProjectInfo, TProjectInfoRequest } from '@/types/projectInfo/projectInfo';

import { axiosInstance } from '../axiosInstance';

export const uploadZipFile = async ({ projectId, zipFile }: TProjectInfoRequest): Promise<TGetProjectInfo> => {
  const formData = new FormData();
  formData.append('zipFile', zipFile);
  const { data } = await axiosInstance.post(`/api/v0/projects/${projectId}/upload`, formData);
  return data;
};
