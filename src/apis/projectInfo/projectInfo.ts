import type {
  TEditRequest,
  TGetProjectInfo,
  TGetProjectMember,
  TPageSummary,
  TProjectInfo,
  TProjectMember,
  TRequestInvite,
} from '@/types/projectInfo/projectInfo';

import { axiosInstance } from '../axiosInstance';

export const getProjectInfo = async ({ projectId }: TProjectInfo): Promise<TGetProjectInfo> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}`);
  return data;
};
export const editIntroduce = async ({ projectId, introduce }: TEditRequest): Promise<TGetProjectInfo> => {
  const { data } = await axiosInstance.patch(`/api/v0/projects/${projectId}`, { projectId, introduce });
  return data;
};
export const getProjectMember = async ({ projectId }: TProjectInfo): Promise<TGetProjectMember> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/team-members`);
  return data;
};
export const getMemberEmail = async ({ projectId }: TProjectInfo): Promise<TProjectMember> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/team-members/emails`);
  return data;
};
export const inviteMember = async (inviteData: TRequestInvite): Promise<TGetProjectMember> => {
  const { data } = await axiosInstance.post('/api/v0/projects/team-members/invite', inviteData);
  return data;
};
export const getPageSummaryList = async ({ projectId }: TProjectInfo): Promise<TPageSummary> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/pages`);
  return data;
};
