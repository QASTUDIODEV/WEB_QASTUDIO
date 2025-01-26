import type { TAddProject, TAddProjectValue, TGetProjectList, TGetTeamMember, TRequestTeamMember } from '@/types/sidebar/sidebar';

import { axiosInstance } from '../axiosInstance';

export const getProjectList = async (): Promise<TGetProjectList> => {
  const { data } = await axiosInstance.get('/api/v0/projects');
  return data;
};
export const addProject = async (projectData: TAddProjectValue): Promise<TAddProject> => {
  const { data } = await axiosInstance.post('/api/v0/projects', projectData);
  return data;
};
export const getTeamMember = async ({ projectId, email }: TRequestTeamMember): Promise<TGetTeamMember> => {
  const { data } = await axiosInstance.get(`/api/v0/projects/${projectId}/team-members/search`, {
    params: { email },
  });

  return data;
};
